'use client';

import { Box, Button, useBoolean } from "@chakra-ui/react";
import { FiEye } from 'react-icons/fi'
import { AiOutlineEyeInvisible } from 'react-icons/ai'

export default function ViewFileButton(){

    const [hoverBtn, setHoverBtn] = useBoolean(false)

    return (
        <Button onMouseEnter={setHoverBtn.toggle} color={'secondary.500'} fontWeight={'normal'} onMouseLeave={setHoverBtn.toggle} type="button" display={'flex'} alignItems={'center'} gap='10px' pr='35px' ml='-20px' position={'relative'} variant={'dark'}>
            Open File

            <Box position={'absolute'} top={'50%'} transform={'translateY(-50%)'} right={'10px'} transition={'opacity 0.2s ease-in-out'} style={{opacity: hoverBtn ? 1 : 0}}>
                <FiEye fontSize='18px' />
            </Box>

            <Box position={'absolute'} top={'50%'} transform={'translateY(-50%)'} right={'10px'} transition={'opacity 0.2s ease-in-out'} style={{opacity: hoverBtn ? 0 : 1}}>
                <AiOutlineEyeInvisible fontSize='18px' />
            </Box>
        </Button>
    )
}