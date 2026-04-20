const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// CORS preflight
app.options("*", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.status(204).end();
});

// Proxy /api/* → bot backend-bridge (port 7202)
// Bot must be running with backend-bridge.js active.
// Players set their portal username+password via !portal in WhatsApp.
const BOT_HOST = process.env.BOT_HOST || "http://127.0.0.1:7202";

app.use(
  "/api",
  createProxyMiddleware({
    target: BOT_HOST,
    changeOrigin: true,
    proxyTimeout: 25000,
    timeout: 25000,
    on: {
      error: (err, req, res) => {
        console.error("[proxy] error:", err.message);
        if (!res.headersSent) {
          res.status(502).json({ error: "Bot server unavailable. Make sure the bot is running." });
        }
      },
    },
  })
);

module.exports = app;
