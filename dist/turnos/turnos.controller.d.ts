import { ClientesService } from "src/clientes/clientes.service";
import { ServiciosService } from "src/servicios/servicios.service";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";
import { TurnosService } from "./turnos.service";
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
            id: string;
            usuario_id: string;
            cliente_id: string;
            activo: boolean | null;
            estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
        }[];
        clientes: {
            id: string;
            activo: boolean | null;
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
        }[];
        usuarios: {
            id: string;
            activo: boolean | null;
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            direccion: string;
            ciudad: string;
            provincia: string;
            pais: string;
            baja_motivo: string | null;
            baja_fecha: Date | null;
        }[];
        servicios: {
            id: string;
            activo: boolean | null;
            nombre: string;
            baja_motivo: string | null;
            baja_fecha: Date | null;
            precio: number;
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
            id: string;
            usuario_id: string;
            cliente_id: string;
            activo: boolean | null;
            estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
        }[];
        turno: {
            fecha: string;
            hora: string;
            id: string;
            usuario_id: string;
            cliente_id: string;
            activo: boolean | null;
            estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
        };
        usuarios: {
            id: string;
            activo: boolean | null;
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            direccion: string;
            ciudad: string;
            provincia: string;
            pais: string;
            baja_motivo: string | null;
            baja_fecha: Date | null;
        }[];
        clientes: {
            id: string;
            activo: boolean | null;
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
        }[];
        servicios: {
            id: string;
            activo: boolean | null;
            nombre: string;
            baja_motivo: string | null;
            baja_fecha: Date | null;
            precio: number;
        }[];
        edit: boolean;
        serviciosSelected: any;
    }>;
    showDetails(id: string): Promise<{
        turno: {
            fecha: string;
            hora: string;
            id: string;
            usuario_id: string;
            cliente_id: string;
            activo: boolean | null;
            estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
        };
    }>;
    acceptTurno(id: string): Promise<{
        id: string;
        fecha: Date;
        hora: Date;
        usuario_id: string;
        cliente_id: string;
        activo: boolean | null;
        estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
    }>;
    create(createTurnoDto: CreateTurnoDto): Promise<void>;
    update(id: string, updateTurnoDto: UpdateTurnoDto): Promise<void>;
    remove(id: string): Promise<void>;
}
