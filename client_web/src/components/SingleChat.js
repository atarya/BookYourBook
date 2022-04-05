import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Text, Box } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./commons/ProfileModal";
import UpdateGroupChatModal from "./commons/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            d={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => {
                                setSelectedChat("");
                            }}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal
                                    user={getSenderFull(
                                        user,
                                        selectedChat.users
                                    )}
                                />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                            </>
                        )}
                    </Text>
                    <Box
                        d="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        h="100%"
                        w="100%"
                        overflowY="hidden"
                        borderRadius="lg"
                    >
                        Messages Go Here
                    </Box>
                </>
            ) : (
                <Box
                    d="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="100%"
                >
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Select a chat to start chatting.
                    </Text>
                </Box>
            )}
        </>
    );
};

export default SingleChat;
