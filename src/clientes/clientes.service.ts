/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from "@nestjs/common";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { ConnectorService } from "src/connector/connector.service";
import { Cliente } from "@prisma/client";

@Injectable()
export class ClientesService {
  constructor(private repo: ConnectorService) {}

  //Funcion para buscar todos los clientes
  async findAll(): Promise<Cliente[]> {
    return this.repo.cliente.findMany();
  }

  //Funcion para buscar cliente por id
  async findOne(id: string): Promise<Cliente> {
    return this.repo.cliente.findUnique({ where: { id } });
  }

  //Funcion para buscar cliente por dni
  async findByDni(dni: number): Promise<Cliente> {
    return this.repo.cliente.findUnique({ where: { dni } });
  }

  //Funcion para crear cliente
  async create(createClienteDto: CreateClienteDto) {
    const transformCliente = {
      ...createClienteDto,
      dni: +createClienteDto.dni,
      telefono: +createClienteDto.telefono,
      activo: true,
    };
    return this.repo.cliente.create({ data: transformCliente });
  }

  //Funcion para actualizar cliente
  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<void> {
    //Parseo de datos de string a number
    const transformCliente = {
      ...updateClienteDto,
      dni: +updateClienteDto.dni,
      telefono: +updateClienteDto.telefono,
    };
    //Actualizacion de cliente mediante cliente de prisma
    const cliente = this.repo.cliente.update({
      where: { id },
      data: transformCliente,
    });

    console.log(`CLiente ${(await cliente).id} actualizado`); //Log de usuario actualizado
  }

  //Funcion para eliminar cliente
  async remove(id: string): Promise<void> {
    const cliente = this.repo.cliente.update({
      where: { id },
      data: { activo: false },
    });
    console.log(`Usuario ${(await cliente).id} eliminado`); //Log de usuario eliminado
  }
}
