import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import {
    isSameSender,
    isLastMessage,
    isSameSenderMargin,
    isSameUser,
} from "../config/ChatLogics";
import { Tooltip } from "@chakra-ui/tooltip";
import { Avatar } from "@chakra-ui/avatar";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => {
                    return (
                        <div style={{ display: "flex" }} key={m._id}>
                            {(isSameSender(messages, m, i, user._id) ||
                                isLastMessage(messages, m, i)) && (
                                <Tooltip
                                    label={m.sender.name}
                                    placement="bottom-start"
                                    hasArrow
                                >
                                    <Avatar
                                        mp="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.avatar}
                                    />
                                </Tooltip>
                            )}
                            <span
                                style={{
                                    backgroundColor: `${
                                        m.sender._id === user._id
                                            ? "#BEE3F8"
                                            : "#B9F5D0"
                                    }`,
                                    borderRadius: "20px",
                                    padding: "5px 15px",
                                    maxWidth: "75%",
                                    marginLeft: isSameSenderMargin(
                                        messages,
                                        m,
                                        i,
                                        user._id
                                    ),
                                    marginTop: isSameUser(
                                        messages,
                                        m,
                                        i,
                                        user._id
                                    )
                                        ? 3
                                        : 10,
                                }}
                            >
                                {m.content}
                            </span>
                        </div>
                    );
                })}
        </ScrollableFeed>
    );
};

export default ScrollableChat;
