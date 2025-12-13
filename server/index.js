const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Contact -> Telegram
app.post("/api/contact", async (req, res) => {
  try {
    const { name, message } = req.body || {};

    if (!message || !String(message).trim()) {
      return res.status(400).json({ ok: false, message: "Message required" });
    }

    // ENV tekshiruv (tokenni chop etmaymiz)
    if (!process.env.TG_BOT_TOKEN || !process.env.TG_CHAT_ID) {
      return res.status(500).json({
        ok: false,
        message: "ENV missing",
        hasToken: !!process.env.TG_BOT_TOKEN,
        hasChatId: !!process.env.TG_CHAT_ID,
      });
    }

    const text =
      `📩 New message from Portfolio\n\n` +
      `👤 Name: ${name ? String(name).trim() : "—"}\n` +
      `📝 Message: ${String(message).trim()}\n` +
      `⏰ Time: ${new Date().toLocaleString()}`;

    const url = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`;

    const tgRes = await axios.post(url, {
      chat_id: process.env.TG_CHAT_ID,
      text,
    });

    return res.json({ ok: true, telegram: tgRes.data });
  } catch (err) {
    // Telegram/axios xatosini aniq qilib qaytaramiz
    const telegramStatus = err.response?.status || null;
    const telegramData = err.response?.data || null;

    console.error("❌ /api/contact error:", {
      telegramStatus,
      telegramData,
      message: err.message,
    });

    return res.status(500).json({
      ok: false,
      message: "Internal Server Error",
      telegramStatus,
      telegramData,
    });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
