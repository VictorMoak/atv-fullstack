import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria, CategoriaDocument } from '../database/schemas/categorias.schema';

@Injectable()
export class CategoriasRepository {
  constructor(
    @InjectModel(Categoria.name)
    private readonly categoriaModel: Model<CategoriaDocument>
  ) {}

  public async findAllCategorias() {
    const categorias = await this.categoriaModel.find();

    return categorias;
  }

  public findOneCategoria(id: number) {
    return this.categoriaModel.findById(id);
  }

  public createCategoria(data: Categoria) {
    const categoria = new this.categoriaModel(data);

    categoria.save();
  }

  public atualizarCategoria(data) { // TODO: precisa tipar
    this.categoriaModel.findByIdAndUpdate(data.id, data, { upsert: false })
  }

  public deletarCategoria(id: number) {
    this.categoriaModel.findByIdAndDelete(id);
  }
}
