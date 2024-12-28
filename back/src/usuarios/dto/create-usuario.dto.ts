import { IsEmail, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    nombre: string
    
    @IsString()
    @IsEmail()
    correo: string

    @IsString()
    password: string
}
