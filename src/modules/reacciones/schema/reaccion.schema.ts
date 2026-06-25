import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReaccionDocument = Reaccion & Document;

@Schema({ 
    timestamps: true,
    collection: 'reacciones' 
})
export class Reaccion {
    @Prop({ type: Types.ObjectId, ref: 'Publicacion', required: true })
    publicacion!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    usuario!: Types.ObjectId;

    @Prop({ 
        enum: ['like', 'amor', 'risa', 'tristeza', 'enojado'], 
        required: true 
    })
    tipo!: string;

    @Prop({ default: true })
    activo!: boolean;
}

export const ReaccionSchema = SchemaFactory.createForClass(Reaccion);