import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReaccionesController } from './reacciones.controller';
import { ReaccionesService } from './reacciones.service';
import { Reaccion, ReaccionSchema } from './schema/reaccion.schema';
import { Publicacion, PublicacionSchema } from '../publicaciones/schema/publicacion.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Reaccion.name, schema: ReaccionSchema },
            { name: Publicacion.name, schema: PublicacionSchema },
        ]),
    ],
    controllers: [ReaccionesController],
    providers: [ReaccionesService],
})
export class ReaccionesModule {}