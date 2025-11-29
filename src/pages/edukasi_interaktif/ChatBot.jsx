import React from 'react'
import NavbarVolunteer from '../../components/NavbarVolunteer'
import HeaderChatBot from '../../sections/edukasi_interaktif/HeaderChatBotSection'
import MainChatbot from '../../sections/edukasi_interaktif/MainChatbotSection'

const ChatBot = () => {
  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-20 pt-24">
        <NavbarVolunteer />
        <HeaderChatBot />
        <MainChatbot />
    </div>
  )
}

export default ChatBot
