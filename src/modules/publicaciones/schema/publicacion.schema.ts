import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PublicacionDocument = Publicacion & Document;

@Schema({ timestamps: true, collection: 'publicaciones' })
export class Publicacion {
  @Prop({ required: true })
  titulo!: string;

  @Prop({ required: true })
  contenido!: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  autor!: Types.ObjectId;

  @Prop({ default: [] })
  imagenes!: string[];

  @Prop({ default: 0 })
  likes!: number;

  @Prop({ default: 0 })
  comentarios!: number;

  @Prop({ default: true })
  activo!: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);