import React, { useState } from 'react';
import { FaPaperPlane } from "react-icons/fa";
import { kirimPesanKeGemini } from '../../backend/ChatbotApi';

const MainChatbot = () => {

    const [input, setInput] = useState(''); 
    const [messages, setMessages] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); 

    const handleSend = async () => {
        if (!input.trim() || isLoading) return; 

        const pesanUser = input;
 
        setMessages([
            ...messages, 
            { role: 'user', text: pesanUser }
        ]);

        setIsLoading(true);
        setInput('');

        // 6. Panggil API Gemini
        const jawabanBot = await kirimPesanKeGemini(pesanUser);

        setMessages(prevMessages => [
            ...prevMessages, 
            { role: 'bot', text: jawabanBot }
        ]);
        setIsLoading(false); 
    };

    return (
        <div className='w-full flex flex-col items-center mt-10'>
            <div className='text-4xl text-[#343432] font-bold'>Hello, Nayaka</div>
            <div className='text-sm text-[#757570] text-center w-1/3 mt-3'>
                Tanyakan apa saja tentang materi ajar, tips mengajar, dan panduan
                volunteer. Asisten AI kami siap membantu Anda!
            </div>
            <div className='w-1/2 h-[200px] overflow-y-auto p-4 my-4 rounded-lg'>
                {messages.length === 0 ? (
                    <div className='text-center text-gray-400'>Belum ada percakapan.</div>
                ) : (
                    messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`p-2 my-2 rounded-[40px] px-7 py-1 ${
                                msg.role === 'user' 
                                ? 'bg-[#FF9D01] text-white text-right ml-auto w-fit' 
                                : 'text-left mr-auto'
                            } max-w-[80%]`}
                        >
                            {msg.text}
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className='text-left text-gray-500 italic'>
                        Tara sedang mengetik...
                    </div>
                )}
            </div>
            <div className='mt-8 px-4 bg-white shadow-[#317B74]/10 w-1/2 rounded-[20px] flex items-center'>
                <input type="text"
                    className='outline-none px-5 py-5 placeholder:text-[#757570] placeholder:font-medium w-full'
                    placeholder='Tanyakan apapun kepada Tara...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    type="button"
                    className={`bg-[#FF9500] w-8 h-8 text-white rounded-[10px] shrink-0 flex items-center justify-center hover:bg-amber-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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