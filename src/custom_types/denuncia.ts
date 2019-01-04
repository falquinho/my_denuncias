import { Base64Image } from './base64-image';


export interface Denuncia {
    email: string,
    motivo_ocorrencia: string,
    imagem: Base64Image
}