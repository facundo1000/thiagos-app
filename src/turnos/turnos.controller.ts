/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
} from "@nestjs/common";
import { ClientesService } from "src/clientes/clientes.service";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";
import { TurnosService } from "./turnos.service";
import { ServiciosService } from "src/servicios/servicios.service";

@Controller("/")
export class TurnosController {
  constructor(
    private readonly turnosService: TurnosService,
    private clientes: ClientesService,
    private usuarios: UsuariosService,
    private servicio: ServiciosService
  ) {}

  //TODO: arreglar mostrar estado de turnos
  @Get()
  @Render("turnos")
  async findAll() {
    const turnos = (await this.turnosService.findAll()).map((turno) => {
      return {
        ...turno,
        //formateo de fecha y hora
        fecha: new Date(turno.fecha).toLocaleDateString(),
        hora: new Date(turno.hora).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });
    const usuarios = await this.usuarios.findAll(); //busqueda de usuarios
    const clientes = await this.clientes.findAll(); //busqueda de clientes
    const servicios = await this.servicio.findAll(); //busqueda de servicios
    return {
      turnos,
      clientes,
      usuarios,
      servicios,
    };
  }

  // @Get(":id")
  // async findOne(@Param("id") id: string) {
  //   const turno = await this.turnosService.findOne(+id);
  //   return { turno };
  // }

  @Post("/create")
  @Redirect("/")
  async create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.create(createTurnoDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnosService.update(+id, updateTurnoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.turnosService.remove(+id);
  }
}
