'use client';

import { Box, Flex, Heading, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import ViewFileButton from "./ViewFileButton";
import { TableFileName } from "./TableFileName";
import CreateFileBtn from "./tableActions/CreateFileBtn";
import { useEffect, useState } from 'react'

import useTable from "@/app/api/useTable";
import resumeText from "@/app/utils/resumeText";
import TableActions from "./tableActions/TableActions";
import { CreateFileState } from "@/app/interfaces/File";

export default function TableComponent(){

    const [isLoading, setIsLoading] = useState(true)
    const [filesData, setFilesData] = useState<Array<CreateFileState>>([])

    const { getTableFiles } = useTable()

    async function handleGetTableFiles(){
        setIsLoading(true)

        try {
            const response = await getTableFiles()
            setFilesData(response || [])
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            setFilesData([])
        }
    }

    function handleOpenFile(downloadURL: string){
        window.open(downloadURL, '_blank')
    }

    useEffect(() => {
        handleGetTableFiles()
    }, [])

    return (
        <>
            <Flex boxShadow={'0px 0px 10px #c2c2c2'} mx='auto' my='200px' w='calc(100% - 40px)' maxW='1200px' bgColor={'white'} borderRadius={'15px'} color={'black'} direction={'column'} p='20px'>
                <Flex w='100%' justify={'space-between'} align={'center'}>
                    <Box>
                        <Heading as='h1' color={'black'} fontWeight={'800'} fontSize={'1.125rem'}>Files Management</Heading>
                        <Text color={'secondary.200'} mt='10px'>Create your first file here!</Text>
                    </Box>

                    <Box>
                        <CreateFileBtn handleGetTableFiles={handleGetTableFiles} filesDataCount={filesData.length} />
                    </Box>
                </Flex>

                <TableContainer mt='30px' w='100%' pb='20px'>
                    <Table w='100%' variant={'unstyled'}>
                        <Thead textAlign={'left'}>
                            <Tr color={'secondary.500'} fontWeight={'900'} bgColor={'secondary.100'} textTransform={'uppercase'} fontSize={'0.75rem'}>
                                <Th pl='20px' py='20px' borderLeftRadius={'10px'}>File name</Th>
                                <Th>Uploaded By</Th>
                                <Th>Preview File</Th>
                                <Th borderRightRadius={'10px'}>Actions</Th>
                            </Tr>
                        </Thead>

                        <Tbody _before={{content: `'-'`, display: 'block', color: 'transparent', pointerEvents: 'none', lineHeight: '20px'}}>
                            {!filesData.length && isLoading ? (
                                    <>
                                        <Tr color={'secondary.500'} transition={'all 0.2s ease-in-out'} bgColor={'transparent'}>
                                            <Td px='0' py='5px' colSpan={5}><Skeleton h='40px' startColor="secondary.100" endColor="secondary.200" /></Td>
                                        </Tr>
                                        <Tr color={'secondary.500'} transition={'all 0.2s ease-in-out'} bgColor={'transparent'}>
                                            <Td px='0' py='5px' colSpan={5}><Skeleton h='40px' startColor="secondary.100" endColor="secondary.200" /></Td>
                                        </Tr>
                                        <Tr color={'secondary.500'} transition={'all 0.2s ease-in-out'} bgColor={'transparent'}>
                                            <Td px='0' py='5px' colSpan={5}><Skeleton h='40px' startColor="secondary.100" endColor="secondary.200" /></Td>
                                        </Tr>
                                    </>
                                ) : (
                                    filesData.length ? (
                                        filesData?.map((file, index) => {
                                            return (
                                                <Tr key={index} color={'secondary.500'} transition={'all 0.2s ease-in-out'} _hover={{backgroundColor: 'secondary.100'}}>
                                                    <Td pl='20px' py='20px' title={file?.fileName}>
                                                        <TableFileName fileName={file?.fileName} />
                                                    </Td>
                                                    <Td title={file?.authorName}>{resumeText({fullPath: file?.authorName})}</Td>
                                                    <Td onClick={() => handleOpenFile(file?.downloadURL)}><ViewFileButton /></Td>
                                                    <Td><TableActions file={file} handleGetTableFiles={handleGetTableFiles} /></Td>
                                                </Tr>
                                            )
                                        })
                                    ) : (
                                        <Tr color={'secondary.500'} transition={'all 0.2s ease-in-out'} bgColor={'secondary.100'}>
                                            <Td pl='20px' py='20px'>The table is clear! Upload your first file.</Td>
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
        </>
    )
}