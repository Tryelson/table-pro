export interface CreateFilePayload {
    file: FileList | null,
    authorName: string
}

export interface CreateFileState{
    fileName: string,
    fullPath: string,
    downloadURL: string,
    authorName: string,
}