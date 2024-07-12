/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Usuario } from "@prisma/client";
import { ConnectorService } from "src/connector/connector.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Injectable()
export class UsuariosService {
  constructor(private repo: ConnectorService) {}

  async findAll(): Promise<Usuario[]> {
    return this.repo.usuario.findMany();
  }

  async create(userDto: CreateUsuarioDto): Promise<Usuario> {
    const transformUser = {
      ...userDto,
      dni: parseInt(userDto.dni),
      telefono: parseInt(userDto.telefono),
      activo: true,
    };

    return this.repo.usuario.create({ data: transformUser });
  }

  async findOne(id: number): Promise<Usuario> {
    return this.repo.usuario.findUnique({ where: { id } });
  }

  async update(id: number, updateDto: UpdateUsuarioDto): Promise<void> {
    const updateUser = {
      ...updateDto,
      dni: +updateDto.dni,
      telefono: +updateDto.telefono,
    };
    const userUpdated = this.repo.usuario.update({
      where: { id },
      data: updateUser,
    });
    console.log(`Usuario ${(await userUpdated).id} actualizado`); //Log de usuario actualizado
  }

  async remove(id: number): Promise<void> {
    const user = this.repo.usuario.update({
      where: { id },
      data: { activo: false },
    });

    console.log(`Usuario ${(await user).id} eliminado`); //Log de usuario eliminado
  }
}
