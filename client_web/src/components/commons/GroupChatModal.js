import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/modal";
import { Button, useToast, Input } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";

import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

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
                title: "Error",
                description: "Failed to load results.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all fields.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                "http://localhost:3000/chat/group",
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u.id)),
                },
                config
            );

            setChats([data, ...chats]);
            onClose();
            toast({
                title: "New Group Created",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(
            selectedUsers.filter((selection) => selection._id !== delUser._id)
        );
    };

    const handleGroup = (userTOAdd) => {
        if (selectedUsers.includes(userTOAdd)) {
            toast({
                title: "warning",
                description: "User already in group.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userTOAdd]);
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        Add Group
                    </ModalHeader>

                    <ModalCloseButton />

                    <ModalBody d="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                placeholder="Group Name"
                                mb={3}
                                onChange={(e) => {
                                    setGroupChatName(e.target.value);
                                }}
                            ></Input>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Participants"
                                mb={1}
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                }}
                            ></Input>
                        </FormControl>

                        <Box w="100%" d="flex" flexWrap="wrap">
                            {selectedUsers.map((user) => (
                                <UserBadgeItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleDelete(user)}
                                />
                            ))}
                        </Box>

                        {loading ? (
                            <div>loading</div>
                        ) : (
                            searchResult?.slice(0, 4).map((u) => (
                                <UserListItem
                                    key={user._id}
                                    user={u}
                                    handleFunction={() => {
                                        handleGroup(u);
                                    }}
                                />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GroupChatModal;
