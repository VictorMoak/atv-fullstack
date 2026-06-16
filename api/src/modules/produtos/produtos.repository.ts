import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Produto, ProdutoDocument } from '../database/schemas/produtos.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProdutosRepository {
  constructor(
    @InjectModel(Produto.name)
    private readonly produtoModel: Model<ProdutoDocument>
  ) {}

  public async findAllProdutos() {
    const produtos = await this.produtoModel.find();

    return produtos;
  }

  public findOneProduto(id: string) {
    return this.produtoModel.findById(id);
  }

  public async createProduto(data: Produto) {
    const produto = new this.produtoModel(data);

    return produto.save();
  }

  public atualizarProduto(id: string, data: Partial<Produto>) {
    return this.produtoModel.findByIdAndUpdate(id, data, { new: true });
  }

  public deletarProduto(id: string) {
    return this.produtoModel.findByIdAndDelete(new Types.ObjectId(id));
  }
}
