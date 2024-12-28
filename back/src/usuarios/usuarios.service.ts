import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class UsuariosService {

  constructor(private prisma: PrismaService) { }

  async create(usuario: CreateUsuarioDto, @Res() res: Response) {
    try {
      usuario = {
        ...usuario,
        password: await hash(usuario.password, 10)
      }
      const userCreated = await this.prisma.usuarios.create({
        data: usuario
      });

      return res.status(HttpStatus.CREATED).json(userCreated);
    } catch(error) {
      return res.status(HttpStatus.NOT_IMPLEMENTED).json({message: "No se ha podido crear el usuario!"})
    }
  }

  async findAll() {
    return this.prisma.usuarios.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
