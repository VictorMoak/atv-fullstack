import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { ProdutosRepository } from './produtos.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema } from '../database/schemas/produtos.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }])],
  controllers: [ProdutosController],
  providers: [ProdutosService, ProdutosRepository]
})
export class ProdutosModule {}
