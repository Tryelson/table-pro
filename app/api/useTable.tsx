'use client';

import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from "@/firebaseConfig";

export default function useTable(){
    
    async function getTableFiles(){
        const storageRef = ref(storage);

        try {
            const response = await listAll(storageRef);
            return response;
        } catch (error) {
            console.error('Error on listing files:', error);
        }
    }

    return { getTableFiles }
}