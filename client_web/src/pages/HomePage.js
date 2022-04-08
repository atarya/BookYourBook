import React from 'react'
import { Image, Button } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { Tooltip, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react"
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { Box, Text } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/avatar"
import { ChatState } from '../Context/ChatProvider'

const HomePage = () => {

    const { user } = ChatState();

    const navigate = useNavigate();

    const submitHandler = () => {
        navigate("/chat")
    }

    return (
        <div>
            <div>
                <Text fontSize='4xl'>Home</Text>
                <Image
                    borderRadius='full'
                    boxSize='150px'
                    src='https://res.cloudinary.com/nupmry/image/upload/v1648367492/bookyourbook/defaults/Screenshot_2022-03-04_at_5.04.26_AM_ntgdwm.png'
                    alt='BookYourBook'
                />
            </div>
            <div>
                <Button style={{ marginTop: 50, marginRight: 10 }} colorScheme='teal' variant='outline'>
                    Exchanges
                </Button>
                <Button style={{ marginTop: 50, marginLeft: 10 }} onClick={() => { submitHandler() }} colorScheme='teal' variant='outline'>
                    Chat
                </Button>
            </div>
        </div >
    )
}

export default HomePage