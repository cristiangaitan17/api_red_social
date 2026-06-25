import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion, PublicacionDocument } from './schema/publicacion.schema';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Types } from 'mongoose';

@Injectable()
export class PublicacionesService {
    constructor(
        @InjectModel(Publicacion.name)
        private publicacionModel: Model<PublicacionDocument>,
    ) {}

    /**
     * Crear una nueva publicación
     */
    async create(dto: CreatePublicacionDto) {
        // Si no se envía autor, asignar uno por defecto (ejemplo)
        if (!dto.autor) {
            dto.autor = new Types.ObjectId('000000000000000000000000'); // ID genérico
        }
        const publicacion = await this.publicacionModel.create(dto);
        return ResponseHelper.success(publicacion, 201);
    }

    /**
     * Consultar todas las publicaciones activas
     */
    async findAll() {
        const publicaciones = await this.publicacionModel
            .find({ activo: true })
            .sort({ createdAt: -1 });
        return ResponseHelper.success(publicaciones);
    }

    /**
     * Consultar publicaciones inactivas
     */
    async findInactive() {
        const publicaciones = await this.publicacionModel
            .find({ activo: false })
            .sort({ createdAt: -1 });
        return ResponseHelper.success(publicaciones);
    }

    /**
     * Consultar publicaciones de un usuario
     */
    async findByUsuario(usuarioId: string) {
        const publicaciones = await this.publicacionModel
            .find({ autor: usuarioId, activo: true })
            .sort({ createdAt: -1 });
        return ResponseHelper.success(publicaciones);
    }

    /**
     * Buscar publicación por ID
     */
    async findOne(id: string) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }
        return ResponseHelper.success(publicacion);
    }

    /**
     * Actualizar publicación
     */
    async update(id: string, dto: UpdatePublicacionDto) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }
        const updated = await this.publicacionModel.findByIdAndUpdate(
            id,
            dto,
            { new: true }
        );
        return ResponseHelper.success(updated);
    }

    /**
     * Actualización parcial
     */
    async partialUpdate(id: string, dto: UpdatePublicacionDto) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }
        const updated = await this.publicacionModel.findByIdAndUpdate(
            id,
            { $set: dto },
            { new: true }
        );
        return ResponseHelper.success(updated);
    }

    /**
     * Incrementar likes de una publicación
     */
    async incrementLikes(id: string) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }
        const updated = await this.publicacionModel.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        return ResponseHelper.success(updated);
    }

    /**
     * Incrementar contador de comentarios
     */
    async incrementComentarios(id: string) {
        await this.publicacionModel.findByIdAndUpdate(
            id,
            { $inc: { comentarios: 1 } },
        );
    }

    /**
     * Restaurar publicación inactiva
     */
    async restore(id: string) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }
        const restored = await this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true }
        );
        return ResponseHelper.success(restored);
    }

    /**
     * Eliminación lógica
     */
    async remove(id: string) {
        const publicacion = await this.publicacionModel.findById(id);
        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }
        const deleted = await this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );
        return ResponseHelper.success(deleted);
    }
}