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

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { selectedChat, setSelectedChat, user } = ChatState();

    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();

    const handleRemove = () => {};

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

            setRenameLoading(false);
        } catch (error) {}
    };

    const handleSearch = () => {};

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
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            mr={3}
                            onClick={() => handleRemove()}
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
