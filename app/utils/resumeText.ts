interface ResumeTextProps {
    fullPath: string
}

export default function resumeText({ fullPath }: ResumeTextProps){

    let formattedText = ''

    if(fullPath.length <= 25){
        formattedText = fullPath
    } else{
        formattedText = `${fullPath.substring(0, 25)}...`
    }

    return formattedText
}