import React, { useState } from 'react'
import { Tooltip, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react"
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { Box, Text } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { Avatar } from "@chakra-ui/avatar"
import { ChatState } from '../../Context/ChatProvider'

const SideDrawer = () => {

    const { user } = ChatState();

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()


    return (
        <>
            <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
                <Tooltip label="Search Users" hasArrow placeContent="bottom-end">
                    <Button variant="ghost">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Text d={{ base: "none", md: "flex" }} px="4">Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">BookYourBook</Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size="sm" cursor="pointer" name={user.name} src={user.avatar} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
        </>
    )
}

export default SideDrawer