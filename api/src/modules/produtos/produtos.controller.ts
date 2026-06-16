import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dtos/create-produto.dto';
import { UpdateProdutoDto } from './dtos/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Get()
  findAllProdutos() {
    return this.produtosService.findAllProdutos();
  }

  @Get('/:id')
  findOneProduto(@Param('id') id: string) {
    return this.produtosService.findOneProduto(id);
  }

  @Post()
  createProduto(@Body() data: CreateProdutoDto) {
    return this.produtosService.createProduto(data);
  }

  @Put('/:id')
  atualizarProduto(@Param('id') id: string, @Body() data: UpdateProdutoDto) {
    return this.produtosService.atualizarProduto(id, data);
  }

  @Delete('/:id')
  deletarProduto(@Param('id') id: string) {
    return this.produtosService.deletarProduto(id);
  }
}
