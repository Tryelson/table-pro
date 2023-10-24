'use client';

import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from "@/firebaseConfig";

export default function useTable(){
    
    async function getTableFiles(){
        const storageRef = ref(storage);

        try {
            const response = await listAll(storageRef);

            const filesWithDownloadURLs = await Promise.all(response.items.map(async (item) => {
                const downloadURL = await getDownloadURL(item);
                const metadata = await getMetadata(item)
                const authorName = metadata?.customMetadata?.author || '';

                return {
                    fileName: item.name,
                    fullPath: item.fullPath,
                    downloadURL,
                    authorName
                };
            }));
          
            return filesWithDownloadURLs;
        } catch (error) {
            console.error('Error on listing files:', error);
        }
    }

    return { getTableFiles }
}