/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";
import { ConnectorService } from "src/connector/connector.service";
import { Turno } from "@prisma/client";

@Injectable()
export class TurnosService {
  constructor(private repo: ConnectorService) {}

  async findAll(): Promise<Turno[]> {
    return this.repo.turno.findMany({
      include: { cliente: true, usuario: true },
    });
  }

  create(createTurnoDto: CreateTurnoDto) {
    return "This action adds a new turno";
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
}
