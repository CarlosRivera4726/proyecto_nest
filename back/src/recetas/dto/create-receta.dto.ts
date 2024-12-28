import { IsNumber } from "class-validator";

export class CreateRecetaDto {
    @IsNumber()
    id_usuario: number

    titulo: string
    descripcion?: string
    instrucciones?: string
}
