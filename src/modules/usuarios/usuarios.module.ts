import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";
import { Module } from "@nestjs/common";

@Module({
    controllers: [UsuariosController],
    providers: [UsuariosService],
    imports: [
    MongooseModule.forFeature([
        {
            name:User.name,
            schema: UserSchema
        },
    ]),
] 
})
    
export class UsuariosModule{}





