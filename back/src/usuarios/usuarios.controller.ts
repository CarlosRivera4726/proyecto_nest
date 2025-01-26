import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('crear')
  create(@Body() createUsuarioDto: CreateUsuarioDto, @Res() res: Response) {
    return this.usuariosService.create(createUsuarioDto, res);
  }

  @Post('crear-muchos')
  createMany(@Body() createUsuarioDto: CreateUsuarioDto[], @Res() res: Response) {
    return this.usuariosService.createMany(createUsuarioDto, res);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.usuariosService.findOne(+id, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto, @Res() res: Response) {
    return this.usuariosService.update(+id, updateUsuarioDto, res);
  }

  @Delete('borrar/:id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.usuariosService.remove(+id, res);
  }

  @Delete('borrar-todos')
  removeAll(@Body() ids: {id: number}[],@Res() res: Response) {
    return this.usuariosService.removeMany(ids, res);
  }
}
