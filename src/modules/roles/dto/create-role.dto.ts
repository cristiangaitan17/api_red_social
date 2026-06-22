import {
    IsNotEmpty, // 💡 Corregido a mayúscula
    IsString,   // 💡 Corregido a mayúscula
} from 'class-validator';

import {
    ApiProperty,
} from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        example: 'administrador',
    })
    @IsString() 
    @IsNotEmpty()
    nombre: string;
}


