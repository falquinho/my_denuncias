
export interface DenunciaPostData {
    email: string,
    motivo_ocorrencia: string,
    file_path: string 
}


export interface Denuncia {
    email: string,
    motivo_ocorrencia: string,
    imagem: {
        data_de_envio: number,
        imagem: string
    }
}