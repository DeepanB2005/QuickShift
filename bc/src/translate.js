import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import qs from "qs"; // Add this import

dotenv.config();
const router = express.Router();
const GOOGLE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

router.post("/", async (req, res) => {
  try {
    const { texts, targetLanguage } = req.body;

    // Log incoming payload for debugging
    console.log("Received texts:", texts);
    console.log("Target language:", targetLanguage);

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return res.status(400).json({ error: "Required Texts" });
    }

    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2`,
      {},
      {
        params: {
          q: texts,
          target: targetLanguage,
          key: GOOGLE_API_KEY,
        },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" }) // Fix for array
      }
    );

    const translations = response.data.data.translations.map(t => t.translatedText);
    res.json({ translations });
  } catch (error) {
    console.error("Google API error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Translation failed",
      details: error.response?.data || error.message
    });
  }
});

export default router;
