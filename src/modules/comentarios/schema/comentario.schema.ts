import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ComentarioDocument = Comentario & Document;  // ← Asegurar que está exportado

@Schema({ 
    timestamps: true,
    collection: 'comentarios' 
})
export class Comentario {
    @Prop({ type: Types.ObjectId, ref: 'Publicacion', required: true })
    publicacion!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    autor!: Types.ObjectId;

    @Prop({ required: true })
    contenido!: string;

    @Prop({ default: 0 })
    likes!: number;

    @Prop({ default: true })
    activo!: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);