'use client';

import { CreateFilePayload } from "@/app/interfaces/File";
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useBoolean, useDisclosure, useToast } from "@chakra-ui/react";
import { storage } from "@/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FormEvent, useState } from "react";

interface CreateFileBtnProps {
    handleGetTableFiles: () => Promise<void>,
    filesDataCount: number
}

export default function CreateFileBtn({ handleGetTableFiles, filesDataCount }: CreateFileBtnProps){

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [formFields, setFormFields] = useState<CreateFilePayload>({
        file: null,
        authorName: ''
    })

    async function handleCreateFile(payload: CreateFilePayload){
        setIsLoading(true)

        if(payload.file && payload.file[0].size <= 1000000){
            const storageRef = ref(storage, payload.file[0].name)

            const metadata = {
                customMetadata: {
                    author: payload.authorName // Define o nome do autor
                }
            };

            const uploadTask = uploadBytesResumable(storageRef, payload.file[0], metadata)

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    setIsLoading(false)
                    toast({
                        title: 'Erro no servidor!',
                        status: 'error',
                        position: 'top',
                        duration: 3000
                    })
                    handleOnCloseModal()
                },
                async () => {
                    await handleGetTableFiles()
                    toast({
                        title: 'Upload feito com sucesso!',
                        status: 'success',
                        position: 'top',
                        duration: 3000
                    })
                    setIsLoading(false)
                    handleOnCloseModal()
                }
            );
        } else {
            toast({
                title: 'Arquivo muito grande! Escolha outro arquivo.',
                status: 'error',
                position: 'top',
                duration: 3000
            })
            setIsLoading(false)
        }
    }

    function handleOnCloseModal(){
        setIsLoading(false)
        onClose()
    }

    async function onSubmit(event: FormEvent){
        event.preventDefault()
        handleCreateFile(formFields)
    }

    return (
        <>
            <Button type="button" onClick={onOpen} borderRadius={'10px'} py='10px' px='20px' variant={'primary'} isDisabled={filesDataCount >= 5}>Upload File</Button>
        
            <Modal isOpen={isOpen} onClose={handleOnCloseModal} isCentered variant={'wide'}>
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
                                    <Button type='button' variant='danger' mr={3} onClick={handleOnCloseModal}>Close</Button>
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