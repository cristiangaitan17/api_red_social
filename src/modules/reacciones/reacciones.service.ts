import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Reaccion, ReaccionDocument } from './schema/reaccion.schema';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateReaccionDto } from './dto/create-reaccion.dto';
import { UpdateReaccionDto } from './dto/update-reaccion.dto';
import { Publicacion, PublicacionDocument } from '../publicaciones/schema/publicacion.schema';

@Injectable()
export class ReaccionesService {
    constructor(
        @InjectModel(Reaccion.name)
        private reaccionModel: Model<ReaccionDocument>,
        @InjectModel(Publicacion.name)
        private publicacionModel: Model<PublicacionDocument>,
    ) {}

    /**
     * Crear o actualizar una reacción
     */
    async create(dto: CreateReaccionDto) {
        // Verificar si ya existe reacción del usuario en esta publicación
        const existing = await this.reaccionModel.findOne({
            publicacion: dto.publicacion,
            usuario: dto.usuario,
            activo: true,
        });

        if (existing) {
            // Actualizar tipo
            existing.tipo = dto.tipo;
            await existing.save();
            return ResponseHelper.success(existing);
        }

        // Crear nueva reacción
        const reaccion = await this.reaccionModel.create(dto);

        // Incrementar likes en la publicación
        await this.publicacionModel.findByIdAndUpdate(
            dto.publicacion,
            { $inc: { likes: 1 } }
        );

        return ResponseHelper.success(reaccion, 201);
    }

    /**
     * Consultar reacciones de una publicación
     */
    async findByPublicacion(publicacionId: string) {
        try {
            const reacciones = await this.reaccionModel
                .find({ publicacion: publicacionId, activo: true })
                .populate('usuario', 'nombre correo')
                .sort({ createdAt: -1 })
                .exec();
            return ResponseHelper.success(reacciones);
        } catch (error) {
            return ResponseHelper.error('Error al obtener reacciones');
        }
    }

    /**
     * Contar reacciones por tipo
     */
    async countByPublicacion(publicacionId: string) {
        try {
            const counts = await this.reaccionModel.aggregate([
                { $match: { publicacion: publicacionId, activo: true } },
                { $group: { _id: '$tipo', count: { $sum: 1 } } },
            ]);
            return ResponseHelper.success(counts);
        } catch (error) {
            return ResponseHelper.error('Error al contar reacciones');
        }
    }

    /**
     * Eliminar una reacción (físico)
     */
    async remove(publicacionId: string, usuarioId: string) {
        const result = await this.reaccionModel.findOneAndDelete({
            publicacion: publicacionId,
            usuario: usuarioId,
        });
        if (!result) {
            throw new NotFoundException('Reacción no encontrada');
        }

        // Decrementar likes en la publicación
        await this.publicacionModel.findByIdAndUpdate(
            publicacionId,
            { $inc: { likes: -1 } }
        );

        return ResponseHelper.success({ message: 'Reacción eliminada exitosamente' });
    }

    /**
     * Verificar si un usuario ya reaccionó
     */
    async findOne(publicacionId: string, usuarioId: string) {
        try {
            const reaccion = await this.reaccionModel.findOne({
                publicacion: publicacionId,
                usuario: usuarioId,
                activo: true,
            });
            return ResponseHelper.success(reaccion);
        } catch (error) {
            return ResponseHelper.error('Error al verificar reacción');
        }
    }
}