'use client';

import { Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

export default function TableComponent(){
    return (
        <Flex mx='auto' my='200px' w='calc(100% - 40px)' maxW='1200px' bgColor={'white'} borderRadius={'15px'} color={'black'} direction={'column'} p='20px'>
            <Flex w='100%' justify={'space-between'}>
                <Box>
                    <Heading as='h1'>Files Management</Heading>
                    <Text>Search or Create your First File!</Text>
                </Box>

                <Box>
                    <Button type="button" bgColor={'#3699FF'} color={'white'} borderRadius={'10px'} p='10px' _hover={{backgroundColor: '#66b1ff'}}>Create File</Button>
                </Box>
            </Flex>

            <TableContainer >
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Header</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        <Tr>
                            <Td>Table Data</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}