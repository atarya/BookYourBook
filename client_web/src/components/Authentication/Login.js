import React, { useState } from "react";
import { VStack, Button } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);

    const handleClick = () => {
        setShow(!show);
    };

    const submitHandler = (e) => {};

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
            >
                Login
            </Button>
        </VStack>
    );
};

export default Login;
