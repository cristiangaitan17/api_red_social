
import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

/**
 * DTO para actualizar un rol
 * parcialtype convierte todas las propiedades
 * create rolDTO campos opcionales
 */

export class UpdateRoleDto extends PartialType(
    CreateRoleDto,
){}


