require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

/**
 * Allowed origins:
 * - Local dev
 * - Vercel production domain
 * - Vercel preview domains (dynamic)
 */
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://my-portfolio-web-site-beryl.vercel.app",
];

// Vercel preview domenlari uchun:
// https://my-portfolio-web-site-xxxxx.vercel.app
function isVercelPreview(origin) {
  return /^https:\/\/my-portfolio-web-site-.*\.vercel\.app$/.test(origin);
}

app.use(
  cors({
    origin: (origin, cb) => {
      // Postman/curl yoki server-to-server requestlarda origin bo‘lmaydi
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin) || isVercelPreview(origin)) {
        return cb(null, true);
      }

      console.error("❌ CORS blocked origin:", origin);
      return cb(new Error("Not allowed by CORS: " + origin));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Express 5: "*" ishlamaydi, shuning uchun "/*splat"
app.options("/*splat", cors());

app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Contact -> Telegram
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    // validate
    if (!message || !String(message).trim()) {
      return res.status(400).json({ ok: false, message: "Message required" });
    }

    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({
        ok: false,
        message: "ENV missing",
        needs: {
          TG_BOT_TOKEN: !token,
          TG_CHAT_ID: !chatId,
        },
      });
    }

    const safeName = name ? String(name).trim() : "—";
    const safeEmail = email ? String(email).trim() : "—";
    const safeMsg = String(message).trim();

    const text =
      `📩 New message from Portfolio\n\n` +
      `👤 Name: ${safeName}\n` +
      `📧 Email: ${safeEmail}\n` +
      `📝 Message:\n${safeMsg}\n\n` +
      `⏰ Time: ${new Date().toLocaleString()}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const tgRes = await axios.post(url, {
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    });

    // Telegram API ok bo‘lsa
    return res.json({
      ok: true,
      telegramOk: tgRes.data?.ok === true,
      messageId: tgRes.data?.result?.message_id,
    });
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

const PORT = Number(process.env.PORT) || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
