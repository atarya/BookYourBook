import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('userInfo')
        if (user) {
            setUser(JSON.parse(user))
        } else {
            navigate('/login')
        }

    }, [navigate])


    return <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>{children}</ChatContext.Provider>

}

export const ChatState = () => useContext(ChatContext);;

export default ChatProvider;