import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error('PORT environment variable is required but was not provided.');
}

const port = Number(rawPort);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const publicRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/public');
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function getSafePath(requestUrl) {
  const pathname = new URL(requestUrl || '/', 'http://localhost').pathname;
  const decoded = decodeURIComponent(pathname);
  const relativePath = decoded.replace(/^\/+/, '');
  const candidate = path.resolve(publicRoot, relativePath);
  return candidate.startsWith(`${publicRoot}${path.sep}`) || candidate === publicRoot ? candidate : null;
}

function sendFile(response, filePath, requestMethod) {
  const extension = path.extname(filePath).toLowerCase();
  response.writeHead(200, {
    'Cache-Control': filePath.endsWith(`${path.sep}index.html`) ? 'no-cache' : 'public, max-age=31536000, immutable',
    'Content-Type': contentTypes[extension] || 'application/octet-stream',
  });
  if (requestMethod !== 'HEAD') response.end(fs.readFileSync(filePath));
  else response.end();
}

const server = http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
    return;
  }

  let requestedFile;
  try {
    requestedFile = getSafePath(request.url);
  } catch {
    response.writeHead(400);
    response.end('Bad Request');
    return;
  }

  if (!requestedFile) {
    response.writeHead(400);
    response.end('Bad Request');
    return;
  }

  const fallbackFile = path.join(publicRoot, 'index.html');
  const filePath = fs.existsSync(requestedFile) && fs.statSync(requestedFile).isFile()
    ? requestedFile
    : fallbackFile;

  if (!fs.existsSync(filePath)) {
    response.writeHead(503);
    response.end('Application is not built');
    return;
  }

  sendFile(response, filePath, request.method);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`All in One Tools production server listening on 0.0.0.0:${port}`);
});