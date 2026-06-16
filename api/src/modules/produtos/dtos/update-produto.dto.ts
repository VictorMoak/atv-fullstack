import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProdutoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  preco?: number;

  @IsString()
  @IsOptional()
  descricao?: string;
}