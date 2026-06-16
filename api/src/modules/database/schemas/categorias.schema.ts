import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoriaDocument = HydratedDocument<Categoria>;

@Schema()
export class Categoria{
  @Prop({ required: true })
  nome: String;

  @Prop({ default: true })
  ativo: boolean;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);