import { Button, IconButton } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { ViewIcon, viewIcon } from "@chakra-ui/icons"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Image, Text } from '@chakra-ui/react'
import React from "react"

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            )}

            <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="400px">
                    <ModalHeader fontSize="40px" fontFamily="Work sans" d="flex" justifyContent="center" >{user.name}</ModalHeader>

                    {/* <ModalCloseButton /> */}

                    <ModalBody d="flex" flexDir="column" alignItems="center" justifyContent="space-between" >
                        <Image borderRadius="full" boxSize="150px" src={user.avatar} alt={user.name} />
                        <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans">Number: {user.phone}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>

                </ModalContent>

            </Modal>
        </>
    )
}

export default ProfileModal