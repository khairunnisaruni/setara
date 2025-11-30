import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

console.log("API Key yang sedang dipakai:", apiKey);

if (!apiKey) {
  throw new Error("API Key Gemini tidak ditemukan. Pastikan ada di file .env");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function kirimPesanKeGemini(pesanUser) {
  try {
    const result = await model.generateContent(pesanUser);
    const response = await result.response;
    const text = await response.text();
    return text;

  } catch (error) {
    console.error("Error saat memanggil Gemini:", error);
    return "Maaf, terjadi kesalahan. Coba lagi nanti.";
  }
}