/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateServicioDto } from "./dto/create-servicio.dto";
import { UpdateServicioDto } from "./dto/update-servicio.dto";
import { ConnectorService } from "src/connector/connector.service";
import { Servicio } from "@prisma/client";

@Injectable()
export class ServiciosService {
  constructor(private repo: ConnectorService) {}

  //Funcion para buscar todos los servicios
  async findAll(): Promise<Servicio[]> {
    return this.repo.servicio.findMany();
  }

  //Funcion para crear servicio
  async create(createServicioDto: CreateServicioDto): Promise<Servicio> {
    const transformServicio = {
      ...createServicioDto,
      precio: +createServicioDto.precio,
      activo: true,
    };
    return this.repo.servicio.create({ data: transformServicio });
  }

  //Funcion para buscar servicio por id
  async findOne(id: string): Promise<Servicio> {
    return this.repo.servicio.findUnique({ where: { id } });
  }

  //Funcion para actualizar servicio
  async update(
    id: string,
    updateServicioDto: UpdateServicioDto
  ): Promise<void> {
    const transformServicio = {
      ...updateServicioDto,
      precio: +updateServicioDto.precio,
      activo: true,
    };
    const servicio = this.repo.servicio.update({
      where: { id },
      data: transformServicio,
    });

    console.log(`Servicio ${(await servicio).id} actualizado`); //Log de usuario actualizado
  }

  //Funcion para eliminar servicio
  async remove(id: string): Promise<void> {
    const servicio = this.repo.servicio.update({
      where: { id },
      data: { activo: false },
    });
    console.log(`Servicio ${(await servicio).id} eliminado`); //Log de usuario actualizado
  }
}
