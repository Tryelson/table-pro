'use client';

import { Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { GoImage } from 'react-icons/go'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

export default function TableComponent(){

    

    return (
        <Flex mx='auto' my='200px' w='calc(100% - 40px)' maxW='1200px' bgColor={'white'} borderRadius={'15px'} color={'black'} direction={'column'} p='20px'>
            <Flex w='100%' justify={'space-between'} align={'center'}>
                <Box>
                    <Heading as='h1' color={'black'} fontWeight={'800'} fontSize={'1.125rem'}>Files Management</Heading>
                    <Text color={'secondary.200'} mt='10px'>Search or create your first file!</Text>
                </Box>

                <Box>
                    <Button type="button" fontWeight={'bold'} bgColor={'primary.100'} color={'white'} borderRadius={'10px'} transition={'all 0.2s ease-in-out'} py='10px' px='20px' _hover={{backgroundColor: 'primary.150'}}>Create File</Button>
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
                        <Tr color={'secondary.500'} transition={'all 0.2s ease-in-out'} _hover={{backgroundColor: 'secondary.100'}}>
                            <Td pl='20px' py='20px'>
                                <Flex align={'center'} gap='5px'>
                                    <GoImage />
                                    file-name.png
                                </Flex>
                            </Td>
                            <Td>Tryelson Marques</Td>
                            <Td>09/09/2023</Td>
                            <Td><Button type="button">Url Link</Button></Td>

                            <Td>
                                <Flex align={'center'} gap={'20px'} color='white'>
                                    <Button type="button" p='7px' rounded={'5px'} transition={'all 0.2s ease-in-out'} bgColor='primary.100' _hover={{backgroundColor: 'primary.150', color: 'white'}}><FiEdit /></Button>
                                    <Button type="button" p='7px' rounded={'5px'} transition={'all 0.2s ease-in-out'} bgColor='red' _hover={{backgroundColor: 'danger.200'}}><FiTrash2 /></Button>
                                </Flex>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}