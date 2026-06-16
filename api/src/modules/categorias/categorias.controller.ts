import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';

@Controller('categorias')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}
  
  @Get()
  findAllCategorias() {
    return this.categoriasService.findAllCategorias();
  }

  @Get('/:id')
  findOneCategoria(@Param('id') id: number) {
    return this.categoriasService.findOneCategoria(id);
  }

  @Post()
  createCategoria(@Body() data): String {
    return this.categoriasService.createCategoria(data);
  }

  @Put('/:id')
  atualizarCategoria(@Param('id') id: number, @Body() data) {
    return this.categoriasService.atualizarCategoria(id, data);
  }

  @Delete('/:id')
  deletarCategoria(@Param('id') id: number): String {
    return this.categoriasService.deletarCategoria(id);
  }
}
