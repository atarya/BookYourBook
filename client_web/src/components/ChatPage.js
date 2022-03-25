import React, { useEffect, useState } from 'react'
// import axios from 'axios'

const Chatpage = () => {
    const [data, setData] = useState([]);
    const fetchChats = async () => {
        const chats = await fetch("http://localhost:3000/api/chats").then(response => response.json())
        setData(chats)
        console.log(chats)
    }

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <div>
            {data.map(chat => {
                return (
                    <h3 key={chat._id}>{chat.chatName}</h3>
                )
            })}
        </div>
    )
}

export default Chatpage