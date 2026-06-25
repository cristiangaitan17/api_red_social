import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publicacion, PublicacionDocument } from './schema/publicacion.schema';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name) private publicacionModel: Model<PublicacionDocument>,
  ) {}

  async create(createPublicacionDto: CreatePublicacionDto, autorId: string) {
    const publicacion = new this.publicacionModel({
      ...createPublicacionDto,
      autor: autorId,
    });
    return publicacion.save();
  }

  async findAll() {
    return this.publicacionModel
      .find({ activo: true })
      .populate('autor', 'nombre email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string) {
    const publicacion = await this.publicacionModel
      .findById(id)
      .populate('autor', 'nombre email')
      .exec();
    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }
    return publicacion;
  }

  async findByAutor(autorId: string) {
    return this.publicacionModel
      .find({ autor: autorId, activo: true })
      .populate('autor', 'nombre email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updatePublicacionDto: UpdatePublicacionDto) {
    const publicacion = await this.publicacionModel
      .findByIdAndUpdate(id, updatePublicacionDto, { new: true })
      .populate('autor', 'nombre email')
      .exec();
    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }
    return publicacion;
  }

  async remove(id: string) {
    // Soft delete
    const publicacion = await this.publicacionModel
      .findByIdAndUpdate(id, { activo: false }, { new: true })
      .exec();
    if (!publicacion) {
      throw new NotFoundException('Publicación no encontrada');
    }
    return { message: 'Publicación desactivada exitosamente' };
  }

  async incrementLikes(id: string) {
    return this.publicacionModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true },
    );
  }

  async incrementComentarios(id: string) {
    return this.publicacionModel.findByIdAndUpdate(
      id,
      { $inc: { comentarios: 1 } },
      { new: true },
    );
  }
}