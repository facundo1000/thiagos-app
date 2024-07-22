/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from "@nestjs/common";
import { ClientesService } from "src/clientes/clientes.service";
import { ServiciosService } from "src/servicios/servicios.service";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";
import { TurnosService } from "./turnos.service";

@Controller("/")
export class TurnosController {
  constructor(
    private readonly turnosService: TurnosService,
    private clientes: ClientesService,
    private usuarios: UsuariosService,
    private servicio: ServiciosService
  ) {}

  //TODO: arreglar mostrar estado de turnos
  //Funcion para mostrar todos los turnos y sus datos
  @Get()
  @Render("turnos")
  async findAll(
    @Query("success") success: boolean,
    @Query("borrar") borrar: boolean,
    @Query("actualizar") actualizar: boolean
  ) {
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
      borrar,
      success,
      actualizar,
    };
  }

  //Funcion para mostrar un turno en particular
  //TODO: acciones de editar
  @Get("edit/turno/:id")
  @Render("turnos")
  async findOne(@Param("id") id: string) {
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
    const turno = await this.turnosService.findOne(+id);
    const usuarios = await this.usuarios.findAll(); //busqueda de usuarios
    const clientes = await this.clientes.findAll(); //busqueda de clientes
    const servicios = await this.servicio.findAll(); //busqueda de servicios
    const edit: boolean = true;
    console.log(`Turno ${id} editado, redirigiendo a pagina principal ${edit}`);
    return { turnos, turno, usuarios, clientes, servicios, edit };
  }

  //Funcion para crear un turno
  @Post("/create")
  @Redirect("/?success=true")
  async create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.create(createTurnoDto);
  }

  //Funcion para actualizar un turno
  //TODO: generar acciones de actualizar
  @Post("update/turno/:id")
  @Redirect("/?actualizar=true")
  update(@Param("id") id: string, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.turnosService.update(+id, updateTurnoDto);
  }

  //Funcion para borrar un turno
  @Get("/delete/:id")
  @Redirect("/?borrar=true")
  remove(@Param("id") id: string) {
    return this.turnosService.remove(+id);
  }
}
