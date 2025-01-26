import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Response } from 'express';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto, @Res() res: Response) {
    return this.recetasService.create(createRecetaDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.recetasService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecetaDto: UpdateRecetaDto) {
    return this.recetasService.update(+id, updateRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetasService.remove(+id);
  }
}
