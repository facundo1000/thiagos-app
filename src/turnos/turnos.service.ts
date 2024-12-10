/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Turno, TURNO_ESTADOS } from "@prisma/client";
import { ConnectorService } from "src/connector/connector.service";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from './dto/update-turno.dto';

@Injectable()
export class TurnosService {
  constructor(private repo: ConnectorService) { }

  // Funcion para mostrar todos los turnos y sus datos
  async findAll(): Promise<Turno[]> {
    return this.repo.turno.findMany({
      orderBy: { estado: "asc" },
      include: {
        cliente: true,
        usuario: true,
        TurnoServicio: { include: { servicio: true } },
      },
    });
  }

  // Funcion para crear un turno
  async create(createTurnoDto: CreateTurnoDto): Promise<void> {
    console.log(createTurnoDto);

    this.repo.turno
      .create({
        data: {
          fecha: new Date(createTurnoDto.fecha),
          hora: new Date(
            Date.UTC(
              0,
              0,
              0,
              +createTurnoDto.hora.split(":")[0],
              +createTurnoDto.hora.split(":")[1]
            )
          ), // Convierte la hora en un objeto Date
          activo: true,
          estado: TURNO_ESTADOS.PENDIENTE,
          cliente: {
            connect: { id: createTurnoDto.cliente },
          },
          usuario: {
            connect: { id: createTurnoDto.usuario },
          },
          TurnoServicio: {
            create:
              createTurnoDto.servicios.length > 1 //comprueba si se seleccionaron varios servicios
                ? createTurnoDto.servicios.map((servicio) => ({
                  servicio: { connect: { id: servicio } }, // Conecta el servicio con el turno si son varios
                  activo: true,
                }))
                : {
                  servicio: { connect: { id: createTurnoDto.servicios[0] } }, // Conecta el servicio con el turno si es uno solo
                  activo: true,
                },
          },
        },
      })
      .catch((e) => {
        console.error(e); // Log the error
      });
  }

  // Funcion para aceptar un turno
  async acceptTurno(id: string): Promise<Turno> {
    return this.repo.turno.update({
      where: { id },
      data: {
        estado: TURNO_ESTADOS.REALIZADO,
        activo: false,
        TurnoServicio: {
          updateMany: { where: { turno_id: id }, data: { activo: true } },
        },
      },
    });
  }

  // Funcion para mostrar un turno en particular
  findOne(id: string): Promise<Turno & { TurnoServicio: { servicio_id: string }[] }> {
    return this.repo.turno.findUnique({
      where: { id },
      include: { TurnoServicio: { include: { servicio: true } } },
    });
  }

  // Function to get selected services by turno
  async getSelectedServicesByTurno(id: string): Promise<string[]> {
    const turno = await this.findOne(id);
    return turno.TurnoServicio.map((turnoServicio) => turnoServicio.servicio_id);
  }


  // Funcion para buscar el turno de un cliente especifico
  async findTurnoByClienteId(id: string): Promise<Turno> {
    return this.repo.turno.findUnique({
      where: { id: id },
      include: { cliente: true, usuario: true, TurnoServicio: true },
    });
  }

  // Funcion para actualizar un turno
  async update(id: string, updateTurnoDto: UpdateTurnoDto) {

    console.log(updateTurnoDto.servicios); // Log the services

    this.repo.turno
      .update({
        where: { id },
        data: {
          fecha: new Date(updateTurnoDto.fecha),
          hora: new Date(
            Date.UTC(
              0,
              0,
              0,
              +updateTurnoDto.hora.split(":")[0],
              +updateTurnoDto.hora.split(":")[1]
            )
          ), // Convierte la hora en un objeto Date
          estado: updateTurnoDto.estado,
          cliente: {
            connect: { id: updateTurnoDto.cliente },
          },
          usuario: {
            connect: { id: updateTurnoDto.usuario },
          },

          TurnoServicio: {
            deleteMany: { turno_id: id }, // Elimina todos los servicios del turno
            create:
              (Array.isArray(updateTurnoDto.servicios)) ? //comprueba si se seleccionaron varios servicios
                updateTurnoDto.servicios.map((servicio) => ({
                  servicio: { connect: { id: servicio } }, // Conecta el servicio con el turno si son varios
                  activo: true,
                })) :
                {
                  servicio: { connect: { id: updateTurnoDto.servicios } }, // Conecta el servicio con el turno si es uno solo
                  activo: true,
                }
          },

        },

      })
      .catch((e) => {
        console.error(e); // Log the error
      });
  }


  // Funcion para buscar los servicios de un turno
  async findServiciosByTurno() {
    return this.repo.turno.findMany({
      include: { TurnoServicio: true },
    });
  }

  // Funcion para eliminar un turno
  async remove(id: string): Promise<void> {
    const turno = this.repo.turno.update({
      where: { id },
      data: {
        activo: false,
        estado: TURNO_ESTADOS.CANCELADO,
        TurnoServicio: {
          updateMany: { where: { turno_id: id }, data: { activo: false } }, // Desactiva todos los servicios asociados del turno
        },
      },
    });
    console.log(`Turno ${(await turno).id} eliminado`); //Log de usuario eliminado
  }
}
