import { IsString, IsOptional, IsBoolean, IsMongoId, IsIn } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReaccionDto {
    @IsMongoId()
    publicacion!: Types.ObjectId;

    @IsMongoId()
    usuario!: Types.ObjectId;

    @IsIn(['like', 'amor', 'risa', 'tristeza', 'enojado'])
    tipo!: string;

    @IsOptional()
    @IsBoolean()
    activo?: boolean;
}