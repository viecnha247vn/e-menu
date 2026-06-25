// Vercel serverless function — đặt tại: api/menu.js
// Trang web gọi /api/menu (cùng tên miền), file này gọi tiếp sang Google Apps Script
// ở phía máy chủ → trình duyệt không phát sinh request chéo trang nên VPN/iOS không chặn.

const APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbyEN7YLX8dMSFdhsqlxxru6Uedtuk09A2b6Wlj-Cos0Kyv8IRJ4HLXqiWPjD3VNHCVI/exec";

module.exports = async (req, res) => {
  const qs = req.url.includes("?") ? req.url.slice(req.url.indexOf("?") + 1) : "";
  try {
    const r = await fetch(APPS_SCRIPT + (qs ? "?" + qs : ""), {
      method: "GET",
      redirect: "follow",
    });
    const text = await r.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(text);
  } catch (e) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(JSON.stringify({ ok: false, error: String(e) }));
  }
};
