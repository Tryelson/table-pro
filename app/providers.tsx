'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeProvider, extendTheme } from '@chakra-ui/react'


const inter = Inter({ subsets: [ 'latin' ] })

export const theme = extendTheme({
    components: {
        Button: {
            variants: {
                primary: {
                    bg: '#3699FF',
                    color: 'white',
                    _hover: {
                        _disabled: {
                            opacity: '0.5',
                            bg: '#3699FF',
                        },
                        bg: '#3699FF',
                        boxShadow: '0px 0px 5px #3699FF'
                    },
                },
                danger: {
                    bg: 'red',
                    color: 'white',
                    _hover: {
                        _disabled: {
                            opacity: '0.5',
                            bg: '#e51f1f',
                        },

                        bg: '#e51f1f',
                        boxShadow: '0px 0px 5px #e51f1f'
                    }
                },
                dark: {
                    bg: 'transparent',
                    color: '#B5B5C3',
                    _hover: {
                        _disabled: {
                            opacity: '0.5',
                            bg: 'black',
                        },

                        bg: 'black',
                        color: 'white',
                        boxShadow: '0px 0px 5px black'
                    }
                }
            }
        },
        Input: {
            variants: {
                customInput: {
                    field: {
                        borderBottom: '2px solid black',
                        borderRadius: '0',
                        bg: 'transparent',

                        _hover: {
                            borderColor: '#63b3ed',
                            boxShadow: '0px 1px 0px 0px #63b3ed'
                        },
                        _focus: {
                            borderColor: '#63b3ed',
                            boxShadow: '0px 1px 0px 0px #63b3ed'
                        }
                    }
                }
            }
        }
    },
    fonts: {
        body: inter.style.fontFamily,
        heading: inter.style.fontFamily
    },
    styles: {
        global: {
            '::-webkit-scrollbar': {
                width: '12px',
            },
            '::-webkit-scrollbar-track': {
                background: '#e5e5e5',
                borderRadius: '6px',
            },
            '::-webkit-scrollbar-thumb': {
                background: '#4b4b4b',
                borderRadius: '6px',
            },
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
    },
})

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