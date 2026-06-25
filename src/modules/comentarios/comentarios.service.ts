import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comentario, ComentarioDocument } from './schema/comentario.schema';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Publicacion, PublicacionDocument } from '../publicaciones/schema/publicacion.schema';

@Injectable()
export class ComentariosService {
    constructor(
        @InjectModel(Comentario.name)
        private comentarioModel: Model<ComentarioDocument>,
        @InjectModel(Publicacion.name)
        private publicacionModel: Model<PublicacionDocument>,
        // No necesitas inyectar User si solo usas populate
    ) {}

    /**
     * Crear un nuevo comentario
     */
    async create(dto: CreateComentarioDto) {
        if (!dto.autor) {
            throw new NotFoundException('El autor es requerido');
        }

        const comentario = await this.comentarioModel.create(dto);

        await this.publicacionModel.findByIdAndUpdate(
            dto.publicacion,
            { $inc: { comentarios: 1 } }
        );

        return ResponseHelper.success(comentario, 201);
    }

    /**
     * Consultar todos los comentarios activos
     */
    async findAll() {
        try {
            const comentarios = await this.comentarioModel
                .find({ activo: true })
                .populate('publicacion', 'titulo')
                //.populate('autor', 'nombre correo')  // 'nombre' y 'correo' son campos de User
                .sort({ createdAt: -1 })
                .exec();
            return ResponseHelper.success(comentarios);
        } catch (error) {
            console.error('Error en findAll:', error);
            return ResponseHelper.error('Error al obtener comentarios');
        }
    }

    /**
     * Consultar comentarios de una publicación
     */
    async findByPublicacion(publicacionId: string) {
        try {
            const comentarios = await this.comentarioModel
                .find({ publicacion: publicacionId, activo: true })
                .populate('autor', 'nombre correo')
                .sort({ createdAt: -1 })
                .exec();
            return ResponseHelper.success(comentarios);
        } catch (error) {
            console.error('Error en findByPublicacion:', error);
            return ResponseHelper.error('Error al obtener comentarios');
        }
    }

    /**
     * Buscar comentario por ID
     */
    async findOne(id: string) {
        try {
            const comentario = await this.comentarioModel
                .findById(id)
                .populate('publicacion', 'titulo')
                .populate('autor', 'nombre correo')
                .exec();
            if (!comentario) {
                throw new NotFoundException('Comentario no encontrado');
            }
            return ResponseHelper.success(comentario);
        } catch (error) {
            console.error('Error en findOne:', error);
            return ResponseHelper.error('Error al obtener comentario');
        }
    }

    /**
     * Consultar comentarios inactivos
     */
    async findInactive() {
        try {
            const comentarios = await this.comentarioModel
                .find({ activo: false })
                .populate('publicacion', 'titulo')
                .populate('autor', 'nombre correo')
                .sort({ createdAt: -1 })
                .exec();
            return ResponseHelper.success(comentarios);
        } catch (error) {
            console.error('Error en findInactive:', error);
            return ResponseHelper.error('Error al obtener comentarios inactivos');
        }
    }

    /**
     * Actualizar comentario
     */
    async update(id: string, dto: UpdateComentarioDto) {
        const comentario = await this.comentarioModel.findById(id);
        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }
        const updated = await this.comentarioModel.findByIdAndUpdate(
            id,
            dto,
            { new: true }
        );
        return ResponseHelper.success(updated);
    }

    /**
     * Actualización parcial
     */
    async partialUpdate(id: string, dto: UpdateComentarioDto) {
        const comentario = await this.comentarioModel.findById(id);
        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }
        const updated = await this.comentarioModel.findByIdAndUpdate(
            id,
            { $set: dto },
            { new: true }
        );
        return ResponseHelper.success(updated);
    }

    /**
     * Restaurar comentario inactivo
     */
    async restore(id: string) {
        const comentario = await this.comentarioModel.findById(id);
        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }
        const restored = await this.comentarioModel.findByIdAndUpdate(
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
        const comentario = await this.comentarioModel.findById(id);
        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }
        const deleted = await this.comentarioModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );
        return ResponseHelper.success(deleted);
    }
}

