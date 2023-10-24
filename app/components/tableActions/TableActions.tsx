import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Flex, Button, useDisclosure, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { ref, deleteObject } from 'firebase/storage';
import { storage } from "@/firebaseConfig";

interface DeleteFileModalProps {
    file: {fileName: string, fullPath: string},
    handleGetTableFiles: () => Promise<void>
}

export default function TableActions({ file, handleGetTableFiles }: DeleteFileModalProps){

    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onClose, onOpen } = useDisclosure()

    async function handleDeleteFile(){
        setIsLoading(prevState => !prevState)

        try {
            const fileRef = ref(storage, file.fileName)
            await deleteObject(fileRef)

            toast({
                title: 'File deleted successfully!',
                position: 'top',
                duration: 3000,
                status: 'success'
            })

            await handleGetTableFiles()
            setIsLoading(prevState => !prevState)
            onClose()
        } catch (error) {
            toast({
                title: 'Error on delete file',
                position: 'top',
                duration: 3000,
                status: 'error'
            })

            setIsLoading(prevState => !prevState)
            onClose()
        }
    }

    return (
        <>
            <Flex align={'center'} gap={'20px'} color='white'>
                <Button onClick={onOpen} type="button" p='7px' rounded={'5px'} variant={'danger'}><FiTrash2 /></Button>
            </Flex>
        
            <Modal isOpen={isOpen} onClose={onClose} isCentered variant={'wide'}>
                <ModalOverlay />
                
                <ModalContent bgColor={'white'} color={'black'}>
                    <ModalCloseButton _hover={{backgroundColor: '#e5e5e5'}} />
                    <ModalBody>
                        <Heading as='h3' mt='40px' fontSize={'20px'}>Are you sure you want to delete this file?</Heading>

                        <Flex align={'center'} justify={'flex-end'} gap='10px' mt='40px' mb='20px'>
                            <Button type='button' variant='primary' mr={3} onClick={onClose}>Close</Button>
                            <Button onClick={handleDeleteFile} type='submit' variant={'danger'} isLoading={isLoading} loadingText={'Deleting...'}>Delete File</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}