import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProdutoDocument = HydratedDocument<Produto>;

@Schema()
export class Produto {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  preco: number;

  @Prop({ required: false })
  descricao?: string;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);

ProdutoSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const document = ret as any;
    document.id = String(document._id);
    delete document._id;
    delete document.__v;
    return document;
  },
});