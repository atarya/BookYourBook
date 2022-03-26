import React, { useState } from 'react'
import { VStack, Button, Box, Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Signup = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(true)
    const [startDate, setStartDate] = useState(new Date());

    const handleClick = () => {
        setShow(!show)
    }

    const postDetails = (avatar) => {

    }

    const submitHandler = (e) => {

    }

    return (
        <VStack spacing="5px" color="black">
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeHolder="Enter your Name" onChange={(e) => { setName(e.target.value) }} />
            </FormControl>
            <FormControl id="phone" isRequired>
                <FormLabel>Phone</FormLabel>
                <Input placeHolder="Enter your Number" onChange={(e) => { setPhone(e.target.value) }} />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "password" : "text"} placeHolder="Enter your Password" onChange={(e) => { setPassword(e.target.value) }} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>{show ? "Show" : "Hide"}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="date" isRequired>
                <Box d="flex" flexDirection="row">
                    <FormLabel>DOB</FormLabel>
                    <DatePicker style={{ width: "50%" }} selected={new Date()} style={{ marginTop: 15 }} onChange={(date: Date) => setStartDate(date)} />
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
            </FormControl>
            <FormControl id="avatar" isRequired>
                <FormLabel>Upload Avatar</FormLabel>
                <Input type="file" p={1.5} accept="image/*" onChange={(e) => { postDetails(e.target.files[0]) }} />
            </FormControl>
            <Button
                colorScheme="teal"
                variant="outline"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={() => { submitHandler() }}
            >
                SignUp
            </Button>
        </VStack>
    )
}

export default Signup