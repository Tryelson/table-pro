'use client';

import { Box, Button, Flex, Heading, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBoolean, useToast } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import ViewFileButton from "./ViewFileButton";
import { TableFileName } from "./TableFileName";
import CreateFileBtn from "./tableActions/CreateFileBtn";
import { CreateFilePayload } from "../interfaces/File";
import { useEffect, useState } from 'react'

import useTable from "../api/useTable";

export default function TableComponent(){

    const toast = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [filesData, setFilesData] = useState<Array<{fileName: string, fullPath: string}>>()

    const { getTableFiles } = useTable()

    async function handleGetTableFiles(){
        try {
            const response = await getTableFiles()
            const filesList = response?.items.map((item) => {
                return {
                    fileName: item.name,
                    fullPath: item.fullPath
                }
            })

            setFilesData(filesList || [])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleGetTableFiles()
    }, [])

    return (
        <Flex boxShadow={'0px 0px 10px #c2c2c2'} mx='auto' my='200px' w='calc(100% - 40px)' maxW='1200px' bgColor={'white'} borderRadius={'15px'} color={'black'} direction={'column'} p='20px'>
            <Flex w='100%' justify={'space-between'} align={'center'}>
                <Box>
                    <Heading as='h1' color={'black'} fontWeight={'800'} fontSize={'1.125rem'}>Files Management</Heading>
                    <Text color={'secondary.200'} mt='10px'>Search or create your first file!</Text>
                </Box>

                <Box>
                    <CreateFileBtn />
                </Box>
            </Flex>

            <TableContainer mt='30px' w='100%'>
                <Table w='100%' variant={'unstyled'}>
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
                        {!filesData && isLoading ? (
                                <>
                                    <Tr color={'secondary.500'} transition={'all 0.2s ease-in-out'} bgColor={'transparent'}>
                                        <Td px='0' colSpan={5}><Skeleton h='40px' startColor="secondary.200" endColor="secondary.500" /></Td>
                                    </Tr>
                                    <Tr color={'secondary.500'} transition={'all 0.2s ease-in-out'} bgColor={'transparent'}>
                                        <Td px='0' colSpan={5}><Skeleton h='40px' startColor="secondary.200" endColor="secondary.500" /></Td>
                                    </Tr>
                                    <Tr color={'secondary.500'} transition={'all 0.2s ease-in-out'} bgColor={'transparent'}>
                                        <Td px='0' colSpan={5}><Skeleton h='40px' startColor="secondary.200" endColor="secondary.500" /></Td>
                                    </Tr>
                                </>
                            ) : (
                                filesData ? (
                                    filesData?.map((file, index) => {
                                        return (
                                            <Tr key={index} color={'secondary.500'} transition={'all 0.2s ease-in-out'} _hover={{backgroundColor: 'secondary.100'}}>
                                                <Td pl='20px' py='20px'>
                                                    <TableFileName fileName={file?.fileName} />
                                                </Td>
                                                <Td>{file.fullPath}</Td>
                                                <Td>-</Td>
                                                <Td><ViewFileButton /></Td>
                                                <Td>
                                                    <Flex align={'center'} gap={'20px'} color='white'>
                                                        <Button type="button" p='7px' rounded={'5px'} variant={'primary'}><FiEdit /></Button>
                                                        <Button type="button" p='7px' rounded={'5px'} variant={'danger'}><FiTrash2 /></Button>
                                                    </Flex>
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                ) : (
                                    <Tr color={'secondary.500'} transition={'all 0.2s ease-in-out'} bgColor={'secondary.100'}>
                                        <Td pl='20px' py='20px'>The table is clear! Upload your first file.</Td>
                                        <Td>-</Td>
                                        <Td>-</Td>
                                        <Td>-</Td>
                                        <Td>-</Td>
                                    </Tr>
                                )
                            )
                        }
                        
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}