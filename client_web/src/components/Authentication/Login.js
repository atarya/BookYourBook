import React, { useState } from "react";
import { VStack, Button, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setShow(!show);
    };

    const toast = useToast();
    const navigate = useNavigate();

    const submitHandler = async () => {
        setLoading(true);
        if (!phone || !password) {
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
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }

                const { data } = await axios.post("http://localhost:3000/user/login", { phone, password }, config);

                toast({
                    title: "Login Successful",
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
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                })
                setLoading(false);
            }
        }
    };

    return (
        <VStack spacing="5px" color="black">
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
                Login
            </Button>
        </VStack>
    );
};

export default Login;
