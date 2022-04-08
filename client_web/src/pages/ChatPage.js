import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../Components/commons/SideDrawer";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/ChatBox";
import { useState } from "react";

const Chatpage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false)

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                d="flex"
                flexDirection="row"
                justifyContent="space-between"
                w="100%"
                h="95vh"
                p="10px"
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    );
};

export default Chatpage;
