import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { Ingrediente } from 'src/interfaces/IIngredientes';

@Injectable()
export class RecetasService {
  constructor(private prisma: PrismaService) { }

  async create(createRecetaDto: CreateRecetaDto, @Res() res: Response) {
    console.log(createRecetaDto);

    try {

      const receta = await this.prisma.recetas.create({
        data: {
          titulo: createRecetaDto.titulo,
          descripcion: createRecetaDto.descripcion,
          instrucciones: createRecetaDto.instrucciones,
          ingredientes: {
            connectOrCreate: createRecetaDto.ingredientes.map((ingrediente: Ingrediente) => ({
              where: { nombre: ingrediente.nombre },
              create: { nombre: ingrediente.nombre }
            }))
          },
          id_usuario: createRecetaDto.id_usuario,
          id_categoria: createRecetaDto.id_categoria
        }
      });
      return res.status(HttpStatus.CREATED).json({ message: "La receta se ha creado correctamente!", receta });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR });
    }

  }

  async findAll(@Res() res: Response) {
    try {
      const recetas = await this.prisma.recetas.findMany({
        select: {
          titulo: true,
          descripcion: true,
          instrucciones: true,
          ingredientes: {
            select: {
              nombre: true
            }
          },
          categoria: {
            select: {
              nombre: true
            }
          },
          usuario: {
            select: {
              nombre: true
            }
          },
          Comentarios: {
            select: {
              comentario: true,
              usuario: {
                select: {
                  nombre: true
                }
              }
            }
          }
        }
      }); // se demora 5 horas 
      return res.status(HttpStatus.OK).json({ message: "Se han encontrado todas las recetas!", recetas });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No se han encontrado recetas!", error: error.message });
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} receta`;
  }

  update(id: number, updateRecetaDto: UpdateRecetaDto) {
    return `This action updates a #${id} receta`;
  }

  remove(id: number) {
    return `This action removes a #${id} receta`;
  }
}
