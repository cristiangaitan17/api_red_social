import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Controller('publicaciones')
export class PublicacionesController {
    constructor(
        private readonly service: PublicacionesService,
    ) {}

    /**
     * Crear una nueva publicación
     * (sin autenticación - el autor se pasa en el body)
     */
    @Post()
    create(@Body() dto: CreatePublicacionDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('inactivas')
    findInactive() {
        return this.service.findInactive();
    }

    @Get('usuario/:usuarioId')
    findByUsuario(@Param('usuarioId') usuarioId: string) {
        return this.service.findByUsuario(usuarioId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdatePublicacionDto,
    ) {
        return this.service.update(id, dto);
    }

    @Patch(':id')
    partialUpdate(
        @Param('id') id: string,
        @Body() dto: UpdatePublicacionDto,
    ) {
        return this.service.partialUpdate(id, dto);
    }

    @Patch(':id/restaurar')
    restore(@Param('id') id: string) {
        return this.service.restore(id);
    }

    @Patch(':id/like')
    like(@Param('id') id: string) {
        return this.service.incrementLikes(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}