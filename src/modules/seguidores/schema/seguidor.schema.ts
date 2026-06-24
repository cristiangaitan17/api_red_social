import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SeguidorDocument = Seguidor & Document;

@Schema({ 
    timestamps: true,
    collection: 'seguidores' 
})
export class Seguidor {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    seguidor!: Types.ObjectId;  // El usuario que sigue

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    seguido!: Types.ObjectId;   // El usuario que es seguido

    @Prop({ default: true })
    activo!: boolean;
}

export const SeguidorSchema = SchemaFactory.createForClass(Seguidor);