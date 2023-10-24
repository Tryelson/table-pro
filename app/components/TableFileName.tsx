import { Flex } from "@chakra-ui/react";
import { GoFile } from "react-icons/go";
import { AiOutlinePicture } from 'react-icons/ai';
import { BsFileText } from 'react-icons/bs';
import { ImFileZip } from 'react-icons/im';
import { VscFilePdf } from 'react-icons/vsc';
import resumeText from "../utils/resumeText";

interface TableFileNameProps {
    fileName: string
}

export function TableFileName({ fileName }: TableFileNameProps){

    function imagesCondition(){
        if(fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.webp')){
            return <AiOutlinePicture color='#2281ff' fontSize='1.375rem' />
        } else if(fileName.endsWith('.zip') || fileName.endsWith('.rar')){
            return <ImFileZip color='#8f8e8d' fontSize='1.375rem' />
        } else if(fileName.endsWith('.pdf')){
            return <VscFilePdf color='#ff0b0b' fontSize='1.375rem' />
        } else if(fileName.endsWith('.txt')){
            return <BsFileText color='#8f8e8d' fontSize='1.375rem' />
        } else {
            return <GoFile color='#8f8e8d' fontSize='1.375rem' />
        }
    }

    return (
        <Flex align={'center'} gap='5px'>
            {imagesCondition()}
            {resumeText({fullPath: fileName})}
        </Flex>
    )
}