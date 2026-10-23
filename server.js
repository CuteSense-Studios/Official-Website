/**
 * CuteSense Studios - Local Development Server
 * Zero-dependency static file server with clean MIME routing and CORS.
 * Usage: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = '127.0.0.1';
const ROOT = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wasm': 'application/wasm',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.db': 'application/octet-stream'
};

function sanitizePath(urlPath) {
    const parsed = new URL(urlPath, 'http://localhost');
    let pathname = decodeURIComponent(parsed.pathname);

    // Default route
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Normalize business-model alias to buisness-model
    if (pathname.includes('/business-model')) {
        pathname = pathname.replace('/business-model', '/buisness-model');
    }

    // Resolve safely within ROOT
    const normalized = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    let safePath = path.join(ROOT, normalized);

    // Auto-append .html if extension is missing
    if (!path.extname(safePath) && fs.existsSync(safePath + '.html')) {
        safePath += '.html';
    }

    // Auto-serve index.html inside directories
    if (fs.existsSync(safePath) && fs.statSync(safePath).isDirectory()) {
        const indexPath = path.join(safePath, 'index.html');
        if (fs.existsSync(indexPath)) {
            safePath = indexPath;
        }
    }

    return safePath;
}

function handleRequest(req, res) {
    // Add CORS headers for local asset and markdown loading
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const filePath = sanitizePath(req.url);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>404 Not Found | CuteSense</title>
                    <style>
                        body { font-family: sans-serif; text-align: center; padding: 5rem 1rem; background: #FFF9F4; color: #1A161D; }
                        h1 { color: #A178AF; font-size: 2.5rem; }
                        p { opacity: 0.8; }
                        a { color: #F08DA1; text-decoration: none; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <h1>404 - Not Found ✨</h1>
                    <p>The requested file could not be found: <code>${req.url}</code></p>
                    <p><a href="/index.html">← Back to Home</a></p>
                </body>
                </html>
            `);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': stats.size
        });

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        stream.on('error', (streamErr) => {
            console.error('Stream error:', streamErr);
            if (!res.headersSent) {
                res.writeHead(500);
            }
            res.end();
        });
    });
}

function startServer(port) {
    const server = http.createServer(handleRequest);

    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} in use, trying port ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });

    server.listen(port, () => {
        console.log('');
        console.log('╭────────────────────────────────────────────────────────╮');
        console.log('│                                                        │');
        console.log('│   ✨ CuteSense Studios Local Development Server        │');
        console.log('│   "Cuteness that makes sense!~"                        │');
        console.log('│                                                        │');
        console.log(`│   ➜ Local:   http://localhost:${port}/                   │`);
        console.log(`│   ➜ Pages:   http://localhost:${port}/pages/projects.html│`);
        console.log('│                                                        │');
        console.log('│   Press Ctrl+C to stop the server                      │');
        console.log('╰────────────────────────────────────────────────────────╯');
        console.log('');
    });
}

startServer(DEFAULT_PORT);
