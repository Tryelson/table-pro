'use client';

import { Box, Button, Flex, Heading, Tab, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { GoImage } from 'react-icons/go'
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import ViewFileButton from "./ViewFileButton";
import { TableFileName } from "./TableFileName";

const filesData = [
    {
        fileName: 'file-name.png',
        uploadedBy: 'Tryelson',
        uploadDate: '10/09/2023'
    },
    {
        fileName: 'test-name.zip',
        uploadedBy: 'Tryelson',
        uploadDate: '09/09/2023'
    },
    {
        fileName: 'text-name.txt',
        uploadedBy: 'Tryelson',
        uploadDate: '09/09/2023'
    },
    {
        fileName: 'pdf-name.pdf',
        uploadedBy: 'Tryelson',
        uploadDate: '09/09/2023'
    },
    {
        fileName: 'file-name.test',
        uploadedBy: 'Tryelson',
        uploadDate: '09/09/2023'
    },
]

export default function TableComponent(){

    return (
        <Flex boxShadow={'0px 0px 10px #c2c2c2'} mx='auto' my='200px' w='calc(100% - 40px)' maxW='1200px' bgColor={'white'} borderRadius={'15px'} color={'black'} direction={'column'} p='20px'>
            <Flex w='100%' justify={'space-between'} align={'center'}>
                <Box>
                    <Heading as='h1' color={'black'} fontWeight={'800'} fontSize={'1.125rem'}>Files Management</Heading>
                    <Text color={'secondary.200'} mt='10px'>Search or create your first file!</Text>
                </Box>

                <Box>
                    <Button type="button" fontWeight={'bold'} bgColor={'primary.100'} color={'white'} borderRadius={'10px'} transition={'all 0.2s ease-in-out'} py='10px' px='20px' _hover={{backgroundColor: 'primary.150', boxShadow: '0px 0px 5px #1b7be0'}}>Create File</Button>
                </Box>
            </Flex>

            <TableContainer mt='30px' w='100%'>
                <Table w='100%'>
                    <Thead textAlign={'left'}>
                        <Tr color={'secondary.500'} fontWeight={'900'} bgColor={'secondary.100'} textTransform={'uppercase'} fontSize={'0.75rem'}>
                            <Th pl='20px' py='20px' borderLeftRadius={'10px'}>File name</Th>
                            <Th>Uploaded By</Th>
                            <Th>Upload Date</Th>
                            <Th>Preview File</Th>
                            <Th borderRightRadius={'10px'}>Actions</Th>
                        </Tr>
                    </Thead>

                    <Tbody _before={{content: `'-'`, display: 'block', color: 'transparent', pointerEvents: 'none', lineHeight: '20px'}}>
                        {filesData?.map((file, index) => {
                            return (
                                <Tr key={index} color={'secondary.500'} transition={'all 0.2s ease-in-out'} _hover={{backgroundColor: 'secondary.100'}}>
                                    <Td pl='20px' py='20px'>
                                        <TableFileName fileName={file?.fileName} />
                                    </Td>

                                    <Td>{file.uploadedBy}</Td>
                                    <Td>{file.uploadDate}</Td>
                                    <Td><ViewFileButton /></Td>
                                    <Td>
                                        <Flex align={'center'} gap={'20px'} color='white'>
                                            <Button type="button" p='7px' rounded={'5px'} transition={'all 0.2s ease-in-out'} bgColor='primary.100' _hover={{backgroundColor: 'primary.150', boxShadow: '0px 0px 5px #1b7be0'}}><FiEdit /></Button>
                                            <Button type="button" p='7px' rounded={'5px'} transition={'all 0.2s ease-in-out'} bgColor='red' _hover={{backgroundColor: 'danger.200', boxShadow: '0px 0px 5px #e51f1f'}}><FiTrash2 /></Button>
                                        </Flex>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}