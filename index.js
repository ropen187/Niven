// نيفين بوت واتساب ذكي باللهجة السودانية
// إعداد بواسطة Ropen n 💫

// استيراد المكتبات المطلوبة
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// API Key من OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// نقطة اختبار بسيطة
app.get("/", (req, res) => {
  res.send("نيفين شغالة ✨");
});

// استقبال الرسائل من واتساب (بعدين بنربطها فعليًا)
app.post("/message", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // لو الزول داير يعمل استيكر (مثلاً كتب s.)
    if (userMessage.startsWith("s.") && req.body.image_url) {
      return res.json({
        reply: "تمام يا زول، دا استيكرّك 😎✨",
        sticker_from: req.body.image_url,
      });
    }

    // نيفين ترد عبر OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "إنت نيفين، بوت ذكي باللهجة السودانية، كلامك طبيعي ومضحك لكن محترم، بتفهم في كل المواضيع.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "ما فهمت قصدك يا زول 😅";

    res.json({ reply });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "حصل خطأ يا زول 😢" });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`نيفين شغالة في البورت ${PORT} 🚀`));
