import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  preco: number;

  @IsString()
  @IsOptional()
  descricao?: string;
}