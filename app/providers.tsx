'use client';

import React from 'react';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'

const theme = {
    styles: {
        global: {
            body: {
                bg: '#E5E5E5'
            }
        }
    }
}

export default function Providers({ children }: {children: React.ReactNode}){
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                <ColorModeProvider options={{initialColorMode: 'dark', useSystemColorMode: false}}>
                    { children }
                </ColorModeProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}