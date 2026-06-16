import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriasRepository } from './categorias.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoria, CategoriaSchema } from '../database/schemas/categorias.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Categoria.name, schema: CategoriaSchema }])],
  providers: [CategoriasService, CategoriasRepository],
  controllers: [CategoriasController]
})
export class CategoriasModule {}
