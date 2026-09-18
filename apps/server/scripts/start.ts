process.env.NODE_ENV = 'production';

const serverEntry = '../dist/server.mjs';
await import(serverEntry);
