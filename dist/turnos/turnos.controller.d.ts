import { ClientesService } from "src/clientes/clientes.service";
import { ServiciosService } from "src/servicios/servicios.service";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";
import { TurnosService } from './turnos.service';
export declare class TurnosController {
    private readonly turnosService;
    private clientes;
    private usuarios;
    private servicio;
    constructor(turnosService: TurnosService, clientes: ClientesService, usuarios: UsuariosService, servicio: ServiciosService);
    findAll(success: boolean, borrar: boolean, actualizar: boolean, realizado: boolean): Promise<{
        turnos: {
            fecha: string;
            hora: string;
            activo: boolean | null;
            id: string;
            estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
            usuario_id: string;
            cliente_id: string;
        }[];
        clientes: {
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: string;
        }[];
        usuarios: {
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: string;
            baja_motivo: string | null;
            baja_fecha: Date | null;
            direccion: string;
            ciudad: string;
            provincia: string;
            pais: string;
        }[];
        servicios: {
            nombre: string;
            activo: boolean | null;
            id: string;
            precio: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
        }[];
        borrar: boolean;
        success: boolean;
        actualizar: boolean;
        realizado: boolean;
    }>;
    findOne(id: string): Promise<{
        turnos: {
            fecha: string;
            hora: string;
            activo: boolean | null;
            id: string;
            estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
            usuario_id: string;
            cliente_id: string;
        }[];
        turno: {
            fecha: string;
            hora: string;
            activo: boolean | null;
            id: string;
            estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
            usuario_id: string;
            cliente_id: string;
            TurnoServicio: {
                servicio_id: string;
            }[];
        };
        usuarios: {
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: string;
            baja_motivo: string | null;
            baja_fecha: Date | null;
            direccion: string;
            ciudad: string;
            provincia: string;
            pais: string;
        }[];
        clientes: {
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: string;
        }[];
        servicios: {
            nombre: string;
            activo: boolean | null;
            id: string;
            precio: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
        }[];
        edit: boolean;
        serviciosSelected: string[];
    }>;
    showDetails(id: string): Promise<{
        turno: {
            fecha: string;
            hora: string;
            activo: boolean | null;
            id: string;
            estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
            usuario_id: string;
            cliente_id: string;
        };
    }>;
    acceptTurno(id: string): Promise<{
        activo: boolean | null;
        id: string;
        fecha: Date;
        hora: Date;
        estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
        usuario_id: string;
        cliente_id: string;
    }>;
    create(createTurnoDto: CreateTurnoDto): Promise<void>;
    update(id: string, updateTurnoDto: UpdateTurnoDto): Promise<void>;
    remove(id: string): Promise<void>;
}
