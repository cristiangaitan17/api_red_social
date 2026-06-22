
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { UsuariosService } from "./usuarios.service";
import { ApiTags } from "@nestjs/swagger";
import { Get, Param, Post, Put, Query, Body, Delete } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { create } from "domain";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
    constructor(
        private readonly service: UsuariosService,
    ) {}



    @Post()
    create(
        @Body()
        dto: CreateUserDto,
    ) {
        return this.service.create(dto);    
    }

    @Get()
    findAll(
        @Query()
        search:SearchUserDto,
    ) {
        return this.service.findAll(search);
    }   

    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id')
        id:string,

        @Body()
        dto:UpdateUserDto
    ){
        return this.service.update(id,dto);
    }
    
    @Delete (':id')
    remove(
        @Param('id')
        id:string,
        
    ){
        return this.service.remove(id)
    }
}
