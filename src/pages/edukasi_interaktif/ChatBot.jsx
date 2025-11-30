import React from 'react'
import NavbarVolunteer from '../../components/NavbarVolunteer'
import HeaderChatBot from '../../sections/edukasi_interaktif/HeaderChatBotSection'
import MainChatbot from '../../sections/edukasi_interaktif/MainChatbotSection'

const ChatBot = () => {
  return (
    <div className='bg-[#FAF8F4] h-auto pb-20'>
        <NavbarVolunteer/>
        <HeaderChatBot/>
        <MainChatbot/>
    </div>
  )
}

export default ChatBot