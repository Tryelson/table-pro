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
    },
    colors: {
        primary: {
            100: '#3699FF',
            150: '#1b7be0',
        },
        secondary: {
            100: '#F3F6F9',
            150: '#e5e5e5',
            200: '#B5B5C3',
            500: '#464E5F'
        },
        danger: {
            100: 'red',
            200: '#e51f1f'
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