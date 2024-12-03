import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { UsuariosService } from "./usuarios.service";
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    findAll(success: boolean, borrar: boolean, actualizar: boolean): Promise<{
        users: {
            nombre: string;
            apellido: string;
            tipo_dni: string;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
            direccion: string;
            ciudad: string;
            provincia: string;
            pais: string;
        }[];
        tipos: any;
        borrar: boolean;
        success: boolean;
        actualizar: boolean;
    }>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        user: Promise<{
            nombre: string;
            apellido: string;
            tipo_dni: string;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
            direccion: string;
            ciudad: string;
            provincia: string;
            pais: string;
        }>;
        edit: boolean;
    }>;
    edit(id: string): Promise<{
        user: {
            nombre: string;
            apellido: string;
            tipo_dni: string;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
            direccion: string;
            ciudad: string;
            provincia: string;
            pais: string;
        };
        users: {
            nombre: string;
            apellido: string;
            tipo_dni: string;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
            direccion: string;
            ciudad: string;
            provincia: string;
            pais: string;
        }[];
        edit: boolean;
        tipos: any;
    }>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<void>;
    remove(id: string): Promise<void>;
}
