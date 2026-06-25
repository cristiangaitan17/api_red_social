import { PartialType } from '@nestjs/mapped-types';
import { CreateReaccionDto } from './create-reaccion.dto';

export class UpdateReaccionDto extends PartialType(CreateReaccionDto) {}