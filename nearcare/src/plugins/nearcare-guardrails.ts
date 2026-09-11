/**
 * NearCare guardrails plugin
 *
 * Enforces the marketplace rules that EmDash's schema validator can't
 * express on its own (see PRODUCT_SPEC.md and the emdash-collections
 * adversarial review this plugin closes out):
 *
 * 1. Exactly one `interests` row per (family, worker) pair.
 * 2. `family_profiles.support_categories` / `worker_profiles.preferred_client_types`
 *    must be non-empty — EmDash's validator only applies minItems to
 *    repeater fields, not multiSelect.
 * 3. `worker_profiles` employment-structure-dependent fields (abn /
 *    subcontractor_details / provider_company_details) are conditionally
 *    required.
 * 4. `notifications` recipient references must match recipient_role —
 *    EmDash has no discriminated-reference field type.
 * 5. `messages` are rejected on an interest where an active `blocks` row
 *    exists between the same family and worker.
 *
 * Plus a best-effort content flag (NOT enforcement) for PRODUCT_SPEC.md's
 * "the person being supported is never named, shown, or implied to be
 * identifiable" rule — see `flagIfRisky` below for why this can only ever
 * be a partial mitigation.
 */
import { fileURLToPath } from "node:url";

import type { PluginDescriptor } from "emdash";
import { ContentSaveRejectedError, definePlugin } from "emdash";

const EMPLOYMENT_DETAIL_FIELD: Record<string, string> = {
	independent_abn: "abn",
	subcontractor: "subcontractor_details",
	employed_by_provider: "provider_company_details",
};

const EMPLOYMENT_DETAIL_LABEL: Record<string, string> = {
	abn: "ABN",
	subcontractor_details: "Subcontractor Details",
	provider_company_details: "Provider Company Details",
};

/**
 * Narrow, best-effort heuristic for one common way a family's free text
 * could name the person being supported (e.g. "my daughter Amy needs...").
 *
 * This is NOT a PII or identity detector. It catches one phrasing pattern
 * and misses everything else — a name with no possessive lead-in, a
 * nickname, a school name, an address, a diagnosis tied to a public figure,
 * etc. PRODUCT_SPEC.md's actual promise ("never captured or displayed")
 * cannot be established by pattern-matching at save time; it depends on a
 * human reviewing anything flagged here before it's ever shown to another
 * user. Treat `content_flagged: false` as "not yet reviewed", never as
 * "confirmed safe".
 */
const POSSIBLE_NAME_MENTION =
	/\b(my|our)\s+(son|daughter|child|kid|boy|girl)\b[^.!?]{0,40}?\b[A-Z][a-z]{1,20}\b/;

function flagIfRisky(content: Record<string, unknown>, fields: string[]): string | null {
	for (const field of fields) {
		const value = content[field];
		if (typeof value === "string" && POSSIBLE_NAME_MENTION.test(value)) {
			return `Possible identifying detail in "${field}" — needs human review before this content is shown.`;
		}
	}
	return null;
}

function isBlank(value: unknown): boolean {
	return typeof value !== "string" || value.trim().length === 0;
}

/**
 * Called by the virtual module system at runtime (native plugin format --
 * see `nearcareGuardrails()` below for the astro.config.mjs-facing
 * descriptor, matching the pattern in packages/plugins/color/src/index.ts
 * of the EmDash monorepo).
 */
export function createPlugin() {
	return definePlugin({
		id: "nearcare-guardrails",
		version: "1.0.0",
		capabilities: ["content:read", "content:write"],
		hooks: {
			"content:beforeSave": async (event, ctx) => {
				const { collection, content } = event;

				if (collection === "family_profiles") {
					if (
						!Array.isArray(content.support_categories) ||
						content.support_categories.length === 0
					) {
						throw new ContentSaveRejectedError("Select at least one support category.");
					}
					const flagReason = flagIfRisky(content, [
						"support_needs_details",
						"diagnoses_conditions",
						"additional_notes",
					]);
					return flagReason
						? { ...content, content_flagged: true, content_flag_reason: flagReason }
						: content;
				}

				if (collection === "worker_profiles") {
					if (
						!Array.isArray(content.preferred_client_types) ||
						content.preferred_client_types.length === 0
					) {
						throw new ContentSaveRejectedError("Select at least one preferred client type.");
					}
					const employmentStructure = content.employment_structure;
					const requiredField =
						typeof employmentStructure === "string"
							? EMPLOYMENT_DETAIL_FIELD[employmentStructure]
							: undefined;
					if (requiredField && isBlank(content[requiredField])) {
						throw new ContentSaveRejectedError(
							`${EMPLOYMENT_DETAIL_LABEL[requiredField]} is required for this employment structure.`,
						);
					}
					return content;
				}

				if (collection === "interests" && event.isNew) {
					const familyId = content.family;
					const workerId = content.worker;
					if (typeof familyId === "string" && typeof workerId === "string" && ctx.content) {
						// Read-then-write: two concurrent submissions for the same pair can
						// both pass this check before either row commits. Closing that race
						// fully needs a compound unique constraint at the database layer —
						// this hook covers the ordinary (non-concurrent) case only.
						const existing = await ctx.content.list("interests", {
							limit: 1,
							where: { fieldFilters: { family: familyId, worker: workerId } },
						});
						if (existing.items.length > 0) {
							throw new ContentSaveRejectedError(
								"This family has already expressed interest in this support worker.",
							);
						}
					}
					return content;
				}

				if (collection === "messages") {
					const flagReason = flagIfRisky(content, ["body"]);
					const interestId = content.interest;
					if (typeof interestId === "string" && ctx.content) {
						const interest = await ctx.content.get("interests", interestId);
						const familyId = interest?.data.family;
						const workerId = interest?.data.worker;
						if (typeof familyId === "string" && typeof workerId === "string") {
							const activeBlocks = await ctx.content.list("blocks", {
								limit: 1,
								where: {
									fieldFilters: { family: familyId, worker: workerId, block_status: "active" },
								},
							});
							if (activeBlocks.items.length > 0) {
								throw new ContentSaveRejectedError(
									"Messaging is disabled — an active block exists between these two parties.",
								);
							}
						}
					}
					return flagReason
						? { ...content, content_flagged: true, content_flag_reason: flagReason }
						: content;
				}

				if (collection === "notifications") {
					const role = content.recipient_role;
					const hasFamily = !isBlank(content.recipient_family);
					const hasWorker = !isBlank(content.recipient_worker);
					if (role === "family" && (!hasFamily || hasWorker)) {
						throw new ContentSaveRejectedError(
							"A family notification must set recipient_family and leave recipient_worker empty.",
						);
					}
					if (role === "worker" && (!hasWorker || hasFamily)) {
						throw new ContentSaveRejectedError(
							"A worker notification must set recipient_worker and leave recipient_family empty.",
						);
					}
					return content;
				}

				return content;
			},
		},
	});
}

export default createPlugin;

/**
 * Descriptor factory for astro.config.mjs's `plugins: []` array. Native
 * format plugins must resolve to a file/package entrypoint the build can
 * statically import (see packages/plugins/color/src/index.ts for the same
 * pattern in the EmDash monorepo) -- passing the `definePlugin(...)` result
 * directly, or even this module's default export, does not work.
 */
export function nearcareGuardrails(): PluginDescriptor {
	return {
		id: "nearcare-guardrails",
		version: "1.0.0",
		entrypoint: fileURLToPath(import.meta.url),
		options: {},
	};
}
