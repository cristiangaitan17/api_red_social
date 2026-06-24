import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { ReaccionesService } from './reacciones.service';
import { CreateReaccionDto } from './dto/create-reaccion.dto';

@Controller('reacciones')
export class ReaccionesController {
    constructor(
        private readonly service: ReaccionesService,
    ) {}

    /**
     * Crear o actualizar una reacción
     */
    @Post()
    create(@Body() dto: CreateReaccionDto) {
        return this.service.create(dto);
    }

    /**
     * Consultar reacciones de una publicación
     */
    @Get('publicacion/:publicacionId')
    findByPublicacion(@Param('publicacionId') publicacionId: string) {
        return this.service.findByPublicacion(publicacionId);
    }

    /**
     * Contar reacciones por tipo
     */
    @Get('publicacion/:publicacionId/count')
    countByPublicacion(@Param('publicacionId') publicacionId: string) {
        return this.service.countByPublicacion(publicacionId);
    }

    /**
     * Verificar si un usuario reaccionó
     */
    @Get('verificar')
    findOne(
        @Query('publicacionId') publicacionId: string,
        @Query('usuarioId') usuarioId: string,
    ) {
        return this.service.findOne(publicacionId, usuarioId);
    }

    /**
     * Eliminar una reacción
     */
    @Delete()
    remove(
        @Query('publicacionId') publicacionId: string,
        @Query('usuarioId') usuarioId: string,
    ) {
        return this.service.remove(publicacionId, usuarioId);
    }
}