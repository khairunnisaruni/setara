import React from 'react'
import BackButton from '../../components/edukasi_interaktif/BackButtonChatbot'
import { Link } from 'react-router-dom';
import Logo from '../../components/edukasi_interaktif/LogoChatbot';

const HeaderChatBot = () => {
    return (
        <div className='px-5 py-4 flex flex-col gap-y-4'>
            <Link to="/">
                <BackButton />
            </Link>
            <Logo/>
        </div>
    )
}

export default HeaderChatBot