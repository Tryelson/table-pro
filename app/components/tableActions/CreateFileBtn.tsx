'use client';

import { CreateFilePayload } from "@/app/interfaces/File";
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useBoolean, useDisclosure, useToast } from "@chakra-ui/react";
import { storage } from "@/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FormEvent, useState } from "react";

export default function CreateFileBtn(){

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [formFields, setFormFields] = useState<CreateFilePayload>({
        file: null,
        authorName: ''
    })

    async function handleCreateFile(payload: CreateFilePayload){
        setIsLoading(true)

        if(payload.file && payload.file[0].size <= 10000000){
            const storageRef = ref(storage, payload.file[0].name)
            const uploadTask = uploadBytesResumable(storageRef, payload.file[0])

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Progresso do Upload: ' + progress + '%');
                },
                (error) => {
                    console.error('Erro durante o upload:', error);
                    setIsLoading(false)
                },
                () => {
                    toast({
                        title: 'Upload feito com sucesso!',
                        status: 'success',
                        position: 'top',
                        duration: 3000
                    })
                    setIsLoading(false)
                }
            );
        }
    }

    async function onSubmit(event: FormEvent){
        event.preventDefault()
        handleCreateFile(formFields)
    }
    
    return (
        <>
            <Button type="button" onClick={onOpen} borderRadius={'10px'} py='10px' px='20px' variant={'primary'}>Upload File</Button>
        
            <Modal isOpen={isOpen} onClose={onClose} isCentered variant={'wide'}>
                <ModalOverlay />
                
                <ModalContent bgColor={'white'} color={'black'}>
                    <ModalHeader>Upload your file here</ModalHeader>
                    <ModalCloseButton _hover={{backgroundColor: '#e5e5e5'}} />

                    <ModalBody>
                        <Box as='form' onSubmit={onSubmit}>
                            <FormControl isRequired>
                                <InputGroup flexDirection={'column'} gap='20px'>
                                    <Flex direction={'column'}>
                                        <FormLabel htmlFor="input-file">File</FormLabel>
                                        <Input p='0' id='input-file' type="file" onChange={(event) => setFormFields({...formFields, file: event.target.files})} />
                                    </Flex>

                                    <Flex direction={'column'}>
                                        <FormLabel htmlFor="author-file">Author</FormLabel>
                                        <Input variant={'customInput'} id='author-file' type="text" onChange={(event) => setFormFields({...formFields, authorName: event.target.value})} />
                                    </Flex>
                                </InputGroup>

                                <Flex align={'center'} justify={'flex-end'} gap='10px' my='20px'>
                                    <Button type='button' variant='danger' mr={3} onClick={onClose}>Close</Button>
                                    <Button type='submit' variant={'primary'} isLoading={isLoading} loadingText={'Uploading...'}>Create File</Button>
                                </Flex>
                            </FormControl>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}