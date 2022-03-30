import React, { useState } from "react";
import {
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Input,
    useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/avatar";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const axios = require("axios");

const SideDrawer = () => {
    const { user, setSelectedChat, chats, setChats } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        window.location.reload();
    };

    const toast = useToast();

    const homeRedirect = () => {
        navigate("/home");
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);

            const config = {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post("http://localhost:3000/chat", { userId }, config);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch (error) {
            toast({
                title: "Couldn't fetch any chats",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Query Required",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top-left",
            });
            return;
        } else {
            try {
                setLoading(true);

                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                const { data } = await axios.get(
                    `http://localhost:3000/user?search=${search}`,
                    config
                );

                setLoading(false);
                setSearchResult(data);
            } catch (error) {
                console.log(error);
                toast({
                    title: "Couldn't get any results",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom-left",
                });
            }
        }
    };

    return (
        <>
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip
                    label="Search Users"
                    hasArrow
                    placeContent="bottom-end"
                >
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Text d={{ base: "none", md: "flex" }} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text
                    fontSize="2xl"
                    fontFamily="Work sans"
                    onClick={() => {
                        homeRedirect();
                    }}
                >
                    BookYourBook
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.avatar}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem
                                onClick={() => {
                                    logoutHandler();
                                }}
                            >
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Search Users
                    </DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={2}>
                            <Input
                                placeholder="Name/Phone"
                                mr={2}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <Button onClick={() => handleSearch()}>Go</Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => {
                                        accessChat(user._id);
                                    }}
                                />
                            ))
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SideDrawer;
