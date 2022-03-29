import React, { useState } from "react";
import {
    VStack,
    Button,
    // Box,
    // Menu,
    // MenuButton,
    // MenuList,
    // MenuItem,
    // MenuGroup,
    useToast,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

const Signup = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);
    const [avatar, setAvatar] = useState();
    const [loading, setLoading] = useState(false);
    // const [startDate, setStartDate] = useState(new Date());
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => {
        setShow(!show);
    };

    const postDetails = (avatar) => {
        setLoading(true);
        if (avatar === undefined) {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (avatar.type === "image/jpeg" || avatar.type === "image/png") {
            const data = new FormData();
            data.append("file", avatar);
            data.append("upload_preset", "book-your-book");
            data.append("cloud_name", "nupmry");
            fetch("https://api.cloudinary.com/v1_1/nupmry/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setAvatar(data.url.toString());
                    console.log(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !phone || !password) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        } else {
            try {
                const config = { headers: { "Content-Type": "application/json" } }
                const { data } = await axios.post('http://localhost:3000/user/register', { name, phone, password, avatar }, config)

                toast({
                    title: "Successfully registered",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });

                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false);
                navigate("/home");

            } catch (error) {
                toast({
                    title: "Error!",
                    // description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                })
                console.log("from catch ", error);
                setLoading(false);
            }
        }
    };

    return (
        <VStack spacing="5px" color="black">
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter your Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </FormControl>
            <FormControl id="phone" isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                    placeholder="Enter your Number"
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "password" : "text"}
                        placeholder="Enter your Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Show" : "Hide"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            {/* <FormControl id="date" isRequired>
                <Box d="flex" flexDirection="row">
                    <FormLabel>DOB</FormLabel>
                    <DatePicker style={{ width: "50%", marginTop: 15 }} selected={new Date()} onChange={(date: Date) => setStartDate(date)} />
                    <Menu w="50%">
                        <MenuButton as={Button} colorScheme='pink'>

                        </MenuButton>
                        <MenuList>
                            <MenuGroup title='Gender'>
                                <MenuItem>Male</MenuItem>
                                <MenuItem>Female </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Box>
            </FormControl> */}
            <FormControl id="avatar">
                <FormLabel>Upload Avatar</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => {
                        postDetails(e.target.files[0]);
                    }}
                />
            </FormControl>
            <Button
                colorScheme="teal"
                variant="outline"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={() => {
                    submitHandler();
                }}
                isLoading={loading}
            >
                SignUp
            </Button>
        </VStack>
    );
};

export default Signup;
