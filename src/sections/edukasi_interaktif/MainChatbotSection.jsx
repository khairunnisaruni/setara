// src/sections/edukasi_interaktif/MainChatbotSection.jsx
import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { kirimPesanKeGemini } from "../../backend/ChatbotApi";
import ReactMarkdown from "react-markdown";

const MainChatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // state untuk nama user yang login
  const [userName, setUserName] = useState("");

  // saat komponen pertama kali dimount, baca user dari localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        // pilih prioritas: name -> username
        const display =
          (parsed?.name && parsed.name.trim()) ||
          (parsed?.username && parsed.username.trim()) ||
          "";
        setUserName(display);
      }
    } catch (err) {
      console.error("Gagal membaca user dari localStorage:", err);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const pesanUser = input;

    // tambahkan pesan user ke chat
    setMessages((prev) => [
      ...prev,
      { role: "user", text: pesanUser },
    ]);

    setIsLoading(true);
    setInput("");

    try {
      // Panggil API Gemini
      const jawabanBot = await kirimPesanKeGemini(pesanUser);

      // tambahkan jawaban bot ke chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", text: jawabanBot },
      ]);
    } catch (err) {
      console.error("Error saat memanggil Gemini:", err);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "bot",
          text: "Maaf, terjadi kesalahan saat memproses pertanyaanmu.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-2">
      {/* Deskripsi di paling atas */}
      <div className="text-sm text-[#757570] text-center w-1/3 mb-5">
        Tanyakan apa saja tentang materi ajar, tips mengajar, dan panduan
        volunteer. Asisten AI kami siap membantu Anda!
      </div>

      {/* Chat Room */}
      <div className="w-1/2 h-[350px] overflow-y-auto p-4 mb-6 rounded-lg">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">
            Belum ada percakapan.
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`w-full flex mb-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-[20px] px-5 py-2 max-w-[75%] break-words ${
                  msg.role === "user"
                    ? "bg-[#FF9D01] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {msg.role === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="text-left text-gray-500 italic">
            Tara sedang mengetik...
          </div>
        )}
      </div>

      {/* Input + tombol kirim */}
      <div className="px-4 bg-white shadow-[#317B74]/10 w-1/2 rounded-[20px] flex items-center">
        <input
          type="text"
          className="outline-none px-5 py-5 placeholder:text-[#757570] placeholder:font-medium w-full"
          placeholder="Tanyakan apapun kepada Tara..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          type="button"
          className={`bg-[#FF9500] w-8 h-8 text-white rounded-[10px] shrink-0 flex items-center justify-center hover:bg-amber-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSend}
          disabled={isLoading}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default MainChatbot;
