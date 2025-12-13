const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://my-portfolio-web-site-beryl.vercel.app",
  // Agar keyin domen o'zgarsa, shu yerga qo'shasan
];

app.use(
  cors({
    origin: (origin, cb) => {
      // Postman/curl kabi tool'larda origin bo'lmaydi -> ruxsat beramiz
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);

      return cb(new Error("Not allowed by CORS: " + origin));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Preflight (OPTIONS) so'rovlari uchun
app.options("*", cors());

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
  console.log(`✅ Server running on port ${PORT}`);
});
