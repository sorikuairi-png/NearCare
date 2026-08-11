// Minimal static file server for local frontend preview.
// Usage: node serve.mjs [port]   (default port 3000)
// Serves the project root at http://localhost:<port>

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.argv[2]) || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Directories nobody should ever be able to fetch over HTTP, even by accident.
const BLOCKED_DIRS = new Set(['node_modules', '.git', '.claude', '.agents']);

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';

  // Resolve against ROOT and refuse anything that escapes it (path traversal).
  const resolved = path.normalize(path.join(ROOT, urlPath));
  if (!resolved.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  const firstSegment = urlPath.split('/').filter(Boolean)[0];
  if (BLOCKED_DIRS.has(firstSegment)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(resolved, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const filePath = stats.isDirectory() ? path.join(resolved, 'index.html') : resolved;
    const ext = path.extname(filePath).toLowerCase();

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
      }
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Serving ${ROOT} at http://localhost:${PORT}`);
});
