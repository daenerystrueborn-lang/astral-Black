const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

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

// Proxy /api/* → bot VPS
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://93.177.64.145:7814",
    changeOrigin: true,
    proxyTimeout: 25000,
    timeout: 25000,
    on: {
      error: (err, req, res) => {
        console.error("[proxy] error:", err.message);
        if (!res.headersSent) {
          res.status(502).json({ error: "Bot server unavailable. Try again shortly." });
        }
      },
    },
  })
);

// Serve built React app
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
