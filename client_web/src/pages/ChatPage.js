import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../Components/commons/SideDrawer";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/ChatBox";

const Chatpage = () => {
    const { user } = ChatState();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                d="flex"
                flexDirection="column"
                justifyContent="space-between"
                w="100%"
                h="50vh"
                p="10px"
            >
                {user && <ChatBox />}
                {user && <MyChats />}
            </Box>
        </div>
    );
};

export default Chatpage;
