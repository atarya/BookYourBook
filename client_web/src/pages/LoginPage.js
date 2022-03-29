import React from 'react'
import { Container, Box, Text, Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react"
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'

const Homepage = () => {
    return (
        <Container maxW='x1' centerContent>
            <Box
                d="flex"
                justifyContent="center"
                p={2}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="10px"
                borderWidth="5px"
            >
                <Text fontSize="4xl" fontFamily="Work sans" color="black" fontStyle="initial">BookYourBook</Text>
            </Box>
            <Box
                p={4}
                bg="white"
                w="100%"
                borderRadius="10px"
                borderWidth="5px"
            >
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">SignUp</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel textColor="black">
                            <Login />
                        </TabPanel>
                        <TabPanel textColor="black">
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage