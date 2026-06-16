import { Injectable, NotFoundException } from '@nestjs/common';
import { ProdutosRepository } from './produtos.repository';
import { UpdateProdutoDto } from './dtos/update-produto.dto';
import { CreateProdutoDto } from './dtos/create-produto.dto';

@Injectable()
export class ProdutosService {
  constructor (private produtosRepository: ProdutosRepository) {}

  public findAllProdutos() {
    return this.produtosRepository.findAllProdutos();
  }

  public async findOneProduto(id: string) {
    const produto = await this.produtosRepository.findOneProduto(id);

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  public async createProduto(data: CreateProdutoDto) {
    return this.produtosRepository.createProduto(data);
  }

  public async atualizarProduto(id: string, data: UpdateProdutoDto) {
    await this.findOneProduto(id);

    return this.produtosRepository.atualizarProduto(id, data);
  }

  async deletarProduto(id: string) {
    await this.findOneProduto(id);

    await this.produtosRepository.deletarProduto(id);

    return { message: 'Produto deletado com sucesso!' };
  }
}
