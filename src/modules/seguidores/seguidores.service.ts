import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Seguidor, SeguidorDocument } from './schema/seguidor.schema';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';

@Injectable()
export class SeguidoresService {
    constructor(
        @InjectModel(Seguidor.name)
        private seguidorModel: Model<SeguidorDocument>,
    ) {}

    /**
     * Seguir a un usuario
     */
    async follow(dto: CreateSeguidorDto) {
        const existing = await this.seguidorModel.findOne({
            seguidor: dto.seguidor,
            seguido: dto.seguido,
            activo: true,
        });

        if (existing) {
            return ResponseHelper.success({ 
                message: 'Ya sigues a este usuario' 
            });
        }

        const follow = await this.seguidorModel.create(dto);
        return ResponseHelper.success(follow, 201);
    }

    /**
     * Obtener seguidores de un usuario
     */
    async getSeguidores(usuarioId: string) {
        const seguidores = await this.seguidorModel
            .find({ seguido: usuarioId, activo: true })
            .populate('seguidor', 'nombre correo')
            .sort({ createdAt: -1 })
            .exec();
        return ResponseHelper.success(seguidores);
    }

    /**
     * Obtener usuarios que sigue un usuario
     */
    async getSiguiendo(usuarioId: string) {
        const siguiendo = await this.seguidorModel
            .find({ seguidor: usuarioId, activo: true })
            .populate('seguido', 'nombre correo')
            .sort({ createdAt: -1 })
            .exec();
        return ResponseHelper.success(siguiendo);
    }

    /**
     * Actualizar un seguimiento
     */
    async update(id: string, dto: UpdateSeguidorDto) {
        const seguidor = await this.seguidorModel.findById(id);
        if (!seguidor) {
            throw new NotFoundException('Seguimiento no encontrado');
        }
        const updated = await this.seguidorModel.findByIdAndUpdate(
            id,
            dto,
            { new: true }
        );
        return ResponseHelper.success(updated);
    }

    /**
     * Actualización parcial
     */
    async partialUpdate(id: string, dto: UpdateSeguidorDto) {
        const seguidor = await this.seguidorModel.findById(id);
        if (!seguidor) {
            throw new NotFoundException('Seguimiento no encontrado');
        }
        const updated = await this.seguidorModel.findByIdAndUpdate(
            id,
            { $set: dto },
            { new: true }
        );
        return ResponseHelper.success(updated);
    }

    /**
     * Eliminar seguimiento (DELETE físico)
     */
    async remove(id: string) {
        const seguidor = await this.seguidorModel.findById(id);
        if (!seguidor) {
            throw new NotFoundException('Seguimiento no encontrado');
        }
        await this.seguidorModel.findByIdAndDelete(id);
        return ResponseHelper.success({ 
            message: 'Dejaste de seguir al usuario' 
        });
    }
}