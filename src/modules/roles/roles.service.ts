import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/roles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel: 
        Model<RoleDocument>,
    ) {}
/**
 * Metodo para crear un nuevo rol
 */

    async create(
        dto:CreateRoleDto,
    ){
        const role =
        await this.roleModel.create({ ...dto });
        return ResponseHelper.success(
            role,
            201,
        );
    }

    /**
     * METODO PARA CONSULTAR ROLES  
     */

    async findAll(){
        const roles =
        await this.roleModel.find({activo:true,});
        return ResponseHelper.success(
            roles,
        );
    }

    /**
     * METODO PARA CONSULTAR UN ROL POR ID
     */

    async findOne(id: string) {
        const role = await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol no encontrado');
        }
        return ResponseHelper.success(role);
    }

/**
 * METODO PARA ACTUALIZAR UN ROL
 */

    async update(id: string, dto: UpdateRoleDto) {
        const role= await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol no encontrado');
        }

        const updatedRole = await this.roleModel.findByIdAndUpdate(
            id, dto,
            { new: true }
        );
        return ResponseHelper.success(updatedRole);
    }

/**
 * actualizacion parcial
 */

    async partialUpdate(id: string, dto: UpdateRoleDto) {
        const role = await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol no encontrado');
        }

        const updatedRole = await this.roleModel.findByIdAndUpdate(
            id, {$set: dto,},
            { new: true }
        );
        return ResponseHelper.success(updatedRole);
    }


/** * METODO PARA ELIMINAR UN ROL
 */
    async remove(id: string) {
        const role = await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol no encontrado');
        }
        const deletedRole = await this.roleModel.findByIdAndUpdate(id,{activo:false,},{new:true,});
        return ResponseHelper.success(deletedRole);
    }

      /**
     * consulta roles eliminados logicamente
     */

    async findInactive(){
        const roles = await this.roleModel.find({activo: false });
        return ResponseHelper.success(roles);
    }

    /**
     * restaurar rol eliminado logicamente 
     */

    async restore(id: string) {
        const role = await this.roleModel.findById(id);

        if (!role) {
            throw new NotFoundException('Rol no encontrado');
        }
        const restoredRole = await this.roleModel.findByIdAndUpdate(id, { activo: true }, { new: true });
        return ResponseHelper.success(restoredRole);
    }
}