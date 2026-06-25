import { IsString, IsOptional, IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSeguidorDto {
    @IsMongoId()
    seguido!: Types.ObjectId;  // A quién se quiere seguir

    @IsOptional()
    @IsMongoId()
    seguidor?: Types.ObjectId;  // Quién sigue (opcional, se puede tomar del usuario autenticado)

    @IsOptional()
    @IsBoolean()
    activo?: boolean;
}