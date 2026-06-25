import { IsString, IsOptional, IsArray, IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePublicacionDto {
    @IsString()
    titulo!: string;

    @IsString()
    contenido!: string;

    @IsOptional()
    @IsArray()
    imagenes?: string[];

    @IsOptional()
    @IsBoolean()
    activo?: boolean;

    @IsOptional()
    @IsMongoId()
    autor?: Types.ObjectId;  // Opcional, si no se envía, se puede asignar un valor por defecto
}