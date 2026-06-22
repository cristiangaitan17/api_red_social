import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import path from 'path/win32';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Controller('roles')
export class RolesController { 
    constructor(
        private readonly service: RolesService,
    ) {} // <--- Aquí solo se cierra el constructor

    /** * Crear rol 
     */
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    
    /**
     * consulta roles inctivos
     */
    @Get('inactivos')
    findInactive() {
        return this.service.findInactive();
    }

    /** 
     * buscar rol por id
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    /**
     * actualizar rol
     */
    @Put(':id')
    update(@Param('id')
    id: string, 
    @Body() 
    dto: UpdateRoleDto) {
        return this.service.update(id, dto);
    }


    /**
     * actualizacion parcial
     */

    @Patch(':id')
    partialUpdate(
        @Param('id') 
        id: string,

        @Body() 
        dto: UpdateRoleDto,
    ) {
        return this.service.partialUpdate(id, dto);
    }

    /**
     * restaurar rol inactivo
     */

    @Patch(':id/restaurar')
    restore(
        @Param('id') id: string) {
        return this.service.restore(id);
    }

    /**
     * eliminacion logica
     */

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }




} // <--- La clase se debe cerrar al final de TODO el archivo