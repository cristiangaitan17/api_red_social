import { Controller, Post, Body, Get, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { SeguidoresService } from './seguidores.service';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';

@Controller('seguidores')
export class SeguidoresController {
    constructor(
        private readonly service: SeguidoresService,
    ) {}

    /**
     * Seguir a un usuario
     */
    @Post()
    follow(@Body() dto: CreateSeguidorDto) {
        return this.service.follow(dto);
    }

    /**
     * Obtener seguidores de un usuario
     */
    @Get('seguidores/:usuarioId')
    getSeguidores(@Param('usuarioId') usuarioId: string) {
        return this.service.getSeguidores(usuarioId);
    }

    /**
     * Obtener usuarios que sigue un usuario
     */
    @Get('siguiendo/:usuarioId')
    getSiguiendo(@Param('usuarioId') usuarioId: string) {
        return this.service.getSiguiendo(usuarioId);
    }

    /**
     * Actualizar un seguimiento
     */
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateSeguidorDto,
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Actualización parcial
     */
    @Patch(':id')
    partialUpdate(
        @Param('id') id: string,
        @Body() dto: UpdateSeguidorDto,
    ) {
        return this.service.partialUpdate(id, dto);
    }

    /**
     * Dejar de seguir (DELETE físico)
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}