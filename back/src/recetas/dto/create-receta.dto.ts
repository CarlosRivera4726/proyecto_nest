import { IsArray, IsNumber, IsString } from "class-validator";
import { Ingrediente } from "src/interfaces/IIngredientes";

export class CreateRecetaDto {
    @IsString()
    titulo: string
    
    @IsString()
    descripcion?: string
    
    @IsString()
    instrucciones?: string
    
    @IsNumber()
    id_usuario: number

    @IsNumber()
    id_categoria?: number

    @IsArray()
    ingredientes: Ingrediente[]

}

