import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriasRepository } from './categorias.repository';

@Injectable()
export class CategoriasService {
  constructor (private categoriasRepository: CategoriasRepository) {}
  
  public findAllCategorias() {
    return this.categoriasRepository.findAllCategorias();
  }

  public findOneCategoria(id: number) {
    const categoria = this.categoriasRepository.findOneCategoria(id);

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrado');
    }

    return categoria;
  }

  public createCategoria(data): String {
    this.categoriasRepository.createCategoria(data);

    return 'Categoria criado com sucesso!!'
  }

  public atualizarCategoria(id: number, data) {
    this.findOneCategoria(id);

    this.categoriasRepository.atualizarCategoria({ id, ...data });

    return 'Categoria atualizado com sucesso!';
  }

  deletarCategoria(id: number): String {
    this.findOneCategoria(id);

    this.categoriasRepository.deletarCategoria(id);

    return 'Categoria deletado com sucesso!';
  }
}
