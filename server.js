import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Yeni endpoint
const HF_URL = "https://router.huggingface.co/models/Qwen/Qwen2-VL-7B";
const HF_TOKEN = process.env.HF_TOKEN; // Render'da environment variable olarak saklanıyor

app.post("/solve", async (req, res) => {
  try {
    const prompt = req.body?.text || "";
    const r = await fetch(HF_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Proxy running on ${port}`));
