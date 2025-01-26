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
    } catch (error) {
      return res.status(HttpStatus.NOT_IMPLEMENTED).json({ message: "No se ha podido crear el usuario!", error: error.message });
    }
  }

  async createMany(usuarios: CreateUsuarioDto[], @Res() res: Response) {
    try {
      const usuariosWithHashedPasswords = await Promise.all(
        usuarios.map(async (usuario) => ({
          ...usuario,
          password: await hash(usuario.password, 10),
        })),
      );

      const usersCreated = await this.prisma.usuarios.createManyAndReturn({
        data: usuariosWithHashedPasswords
      });

      return res.status(HttpStatus.CREATED).json(usersCreated);
    } catch (error) {
      return res.status(HttpStatus.NOT_IMPLEMENTED).json({ message: "No se han podido crear los usuarios!", error: error.message });
    }
  }

  async findAll() {
    return this.prisma.usuarios.findMany();
  }

  async findOne(id: number, @Res() res: Response) {
    try {
      const user = await this.prisma.usuarios.findUnique({
        where: { id }
      });

      if (user === null) {
        throw new Error("Usuario no encontrado!");
      }

      return res.status(HttpStatus.FOUND).json({ message: "Usuario encontrado con exito!", user });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No se ha podido encontrar el usuario!", error: error.message });
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto, @Res() res: Response) {
    try {
      if (updateUsuarioDto.password) {
        updateUsuarioDto = {
          ...updateUsuarioDto,
          password: await hash(updateUsuarioDto.password, 10)
        }
      }
      const userUpdated = await this.prisma.usuarios.update({
        where: { id },
        data: {
          ...updateUsuarioDto,
        }
      });

      return res.status(HttpStatus.OK).json({ message: "Usuario actualizado con exito!", userUpdated });


    } catch (error) {
      return { message: "No se ha podido actualizar el usuario!", error: error.message };
    }
  }

  async remove(id: number, @Res() res: Response) {
    try {
      const userDeleted = await this.prisma.usuarios.delete({
        where: { id }
      });

      return res.status(HttpStatus.OK).json({ message: "Usuario eliminado con exito!", userDeleted });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No se ha podido eliminar el usuario!", error: error.message });
    }
  }

  async removeMany(identificadores: { id: number }[], @Res() res: Response) {
    try {
      // Listas para los resultados y errores
      const usersDeleted = [];
      const errors = [];
  
      // Usamos Promise.all para manejar las operaciones asíncronas
      const results = await Promise.all(
        identificadores.map(async ({ id }) => {
          try {
            const userDeleted = await this.prisma.usuarios.delete({
              where: { id },
            });
            usersDeleted.push(userDeleted);
          } catch (error) {
            errors.push(`Usuario con el identificador ${id} no encontrado o no pudo ser eliminado.`);
          }
        })
      );
      console.log(results);
  
      // Retornamos el resultado
      return res.status(HttpStatus.OK).json({
        message: "Usuarios eliminados con éxito!",
        usersDeleted,
        errors,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Ocurrió un error al intentar eliminar los usuarios!",
        error: error.message,
      });
    }
  }
}  
