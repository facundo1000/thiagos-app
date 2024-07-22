/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Turno, TURNO_ESTADOS } from "@prisma/client";
import { ClientesService } from "src/clientes/clientes.service";
import { ConnectorService } from "src/connector/connector.service";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";

@Injectable()
export class TurnosService {
  constructor(
    private repo: ConnectorService,
    private usuario: UsuariosService,
    private cliente: ClientesService
  ) {}

  async findAll(): Promise<Turno[]> {
    return this.repo.turno.findMany({
      include: { cliente: true, usuario: true },
    });
  }

  async create(createTurnoDto: CreateTurnoDto): Promise<void> {
    console.log(createTurnoDto);

    if (isNaN(+createTurnoDto.cliente) || isNaN(+createTurnoDto.usuario)) {
      throw new Error("El id del cliente y el usuario deben ser un número");
    }

    this.repo.turno
      .create({
        data: {
          fecha: new Date(createTurnoDto.fecha),
          hora: this.formatTimeStringToDate(createTurnoDto.hora),
          activo: true,
          estado: TURNO_ESTADOS.PENDIENTE,
          cliente: {
            connect: { id: +createTurnoDto.cliente },
          },
          usuario: {
            connect: { id: +createTurnoDto.usuario },
          },
          TurnoServicio: {
            connect: createTurnoDto.servicios.map((servicio) => ({
              id: +servicio,
            })),
          },
        },
      })
      .catch((e) => {
        console.error(e);
      });
  }

  findOne(id: number) {
    return this.repo.turno.findUnique({ where: { id } });
  }

  update(id: number, updateTurnoDto: UpdateTurnoDto) {
    return `This action updates a #${id} turno`;
  }

  remove(id: number) {
    return `This action removes a #${id} turno`;
  }

  formatTimeStringToDate(timeString: string): Date {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(":").map(Number);

    // Create a new Date object for the current date
    const date = new Date(0, 0, 0, hours, minutes);

    // Set the hours and minutes from the time string
    // date.setHours(hours, minutes);

    return date;
  }
}
