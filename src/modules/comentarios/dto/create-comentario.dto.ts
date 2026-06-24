import { IsString, IsOptional, IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateComentarioDto {
    @IsMongoId()
    publicacion!: Types.ObjectId;

    @IsString()
    contenido!: string;

    @IsMongoId()
    autor!: Types.ObjectId;  // ← Ahora es OBLIGATORIO

    @IsOptional()
    @IsBoolean()
    activo?: boolean;
}