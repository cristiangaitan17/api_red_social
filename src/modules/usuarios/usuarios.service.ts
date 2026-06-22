import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from "src/common/helpers/response.helper";
import { SearchUserDto } from "./dto/search-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsuariosService {
   constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<UserDocument>
   ) {}

   /**
    * Método para crear un nuevo usuario
    */  
   async create(dto: any): Promise<any> { // Nota: Cambiado a Promise<any> porque ResponseHelper envuelve el User
    // 1. Verificar si el correo ya existe
    const exist = await this.userModel.findOne({ correo: dto.correo });
    
    // CORRECCIÓN: Validar si la constante 'exist' tiene un usuario
    if (exist) {
      throw new BadRequestException('El correo ya existe');
    }

    // 2. Encriptar contraseña (ahora sí es alcanzable)
    const hashedPassword = await bcrypt.hash(dto.password, 10);
   
    // 3. Crear el usuario con la contraseña hacheada
    const user = await this.userModel.create({ ...dto, password: hashedPassword });

    return ResponseHelper.success(
     user,
     201,
    );
   }

   async findAll(search: SearchUserDto) {
        const filter: any = { activo: true };

        // Filtro por nombre
        if (search.nombre) {
            filter.nombre = { $regex: search.nombre, $options: 'i' };
        }

        const page = search.page || 1;
        const limit = Number(search.limit) || 10;

        // consulta
        const data = await this.userModel.find(filter).populate('rol_id').skip((page - 1) * limit).limit(limit);
        //contador de documentos = contador de usuarios
        const total = await this.userModel.countDocuments(filter);
        return ResponseHelper.success({total, page, limit, data});

   }

   /**
    * consultar usuario por id
    */
   async findOne(id: string) {
    const user = await this.userModel.findById(id).populate('rol_id');

    if (!user) {
    throw new BadRequestException('Usuario no encontrado');  
    }
    return ResponseHelper.success(user);
   }

   /**
    * actualizar de horario
    */
    async update(id: string, dto:UpdateUserDto){
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        if(dto.password){
            dto.password=await bcrypt.hash(dto.password,10)
        }
        const updateuser = await this.userModel.findByIdAndUpdate(id, dto, { new: true });
        return ResponseHelper.success(updateuser);
    }

    /**
     * soft delete  
     */

    async remove(id: string) {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const deletedUser = await this.userModel.findByIdAndUpdate(id, { activo: false },{new:true});
        return ResponseHelper.success(deletedUser);
    }

}