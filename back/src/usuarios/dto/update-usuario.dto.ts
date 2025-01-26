import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsString()
    nombre: string

    @IsString()
    @IsEmail()
    correo: string

    @IsString()
    @IsEmpty()
    password?: string;
}
