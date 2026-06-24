import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Controller('comentarios')
export class ComentariosController {
    constructor(
        private readonly service: ComentariosService,
    ) {}

    /**
     * Crear un nuevo comentario
     */
    @Post()
    create(@Body() dto: CreateComentarioDto) {
        return this.service.create(dto);
    }

    /**
     * Consultar todos los comentarios activos
     */
    @Get()
    findAll() {
        return this.service.findAll();
    }

    /**
     * Consultar comentarios inactivos
     */
    @Get('inactivos')
    findInactive() {
        return this.service.findInactive();
    }

    /**
     * Consultar comentarios de una publicación
     */
    @Get('publicacion/:publicacionId')
    findByPublicacion(@Param('publicacionId') publicacionId: string) {
        return this.service.findByPublicacion(publicacionId);
    }

    /**
     * Buscar comentario por ID
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    /**
     * Actualizar comentario
     */
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateComentarioDto,
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Actualización parcial de comentario
     */
    @Patch(':id')
    partialUpdate(
        @Param('id') id: string,
        @Body() dto: UpdateComentarioDto,
    ) {
        return this.service.partialUpdate(id, dto);
    }

    /**
     * Restaurar comentario inactivo
     */
    @Patch(':id/restaurar')
    restore(@Param('id') id: string) {
        return this.service.restore(id);
    }

    /**
     * Eliminación lógica de comentario
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}



