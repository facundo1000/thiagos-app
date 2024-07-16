/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { ConnectorService } from "src/connector/connector.service";
import { Cliente } from "@prisma/client";

@Injectable()
export class ClientesService {
  constructor(private repo: ConnectorService) {}

  async findAll(): Promise<Cliente[]> {
    return this.repo.cliente.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  create(createClienteDto: CreateClienteDto) {
    return "This action adds a new cliente";
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
