import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/spinner";
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { selectedChat, setSelectedChat, user } = ChatState();

    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();

    const handleAddUser = async (newUser) => {
        if (selectedChat.users.find((u) => u._id === newUser._id)) {
            toast({
                title: "User already in chat",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "You are not the admin",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(
                "http://localhost:3000/chat/groupadd",
                {
                    chatId: selectedChat._id,
                    userId: newUser._id,
                },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            setLoading(false);
        }
    };

    const handleRemove = async (newUser) => {
        if (
            user._id !== newUser._id &&
            selectedChat.groupAdmin._id !== user._id
        ) {
            toast({
                title: "Only Admins can remove users",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(
                "http://localhost:3000/chat/groupremove",
                {
                    chatId: selectedChat._id,
                    userId: newUser._id,
                },
                config
            );

            newUser._id === user._id
                ? setSelectedChat()
                : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            setLoading(false);
        }
    };

    const handleRename = async () => {
        if (!groupChatName) return;
        setRenameLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(
                "http://localhost:3000/chat/rename",
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                },
                config
            );
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setRenameLoading(false);
            setGroupChatName("");
        }
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
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
            <IconButton
                d={{ base: "flec" }}
                icon={<ViewIcon />}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        {selectedChat.chatName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w="100%" d="flex" pb={3} flexWrap="wrap">
                            {selectedChat.users.map((user) => (
                                <UserBadgeItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleRemove(user)}
                                />
                            ))}
                        </Box>
                        <FormControl d="flex">
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                value={groupChatName}
                                onChange={(e) =>
                                    setGroupChatName(e.target.value)
                                }
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Users"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {loading ? (
                            <Spinner size="lg" />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            user={user}
                            mr={3}
                            onClick={() => handleRemove(user)}
                        >
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateGroupChatModal;
