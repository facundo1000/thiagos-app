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
import { format } from "date-fns";
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

  //Funcion para mostrar todos los turnos y sus datos
  @Get()
  @Render("turnos")
  async findAll(
    @Query("success") success: boolean,
    @Query("borrar") borrar: boolean,
    @Query("actualizar") actualizar: boolean,
    @Query("realizado") realizado: boolean
  ) {
    const turnos = (await this.turnosService.findAll()).map((turno) => {
      return {
        ...turno,
        //formateo de fecha y hora
        fecha: format(turno.fecha, "dd-MM-yyyy"),
        hora: format(turno.hora, "HH:mm a"),
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
      realizado,
    };
  }

  //Funcion para mostrar un turno en particular
  @Get("edit/turno/:id")
  @Render("turnos")
  async findOne(@Param("id") id: string) {
    const turnos = (await this.turnosService.findAll()).map((turno) => {
      return {
        ...turno,
        //formateo de fecha y hora
        fecha: format(turno.fecha, "dd-MM-yyyy"),
        hora: format(turno.hora, "HH:mm a"),
      };
    });
    const turno = await this.turnosService.findOne(+id).then((turno) => {
      return {
        ...turno,
        //formateo de fecha y hora
        fecha: format(turno.fecha, "yyyy-MM-dd"),
        hora: format(turno.hora, "HH:mm"),
      };
    });

    //Servicios seleccionados
    const serviciosSelected = await this.turnosService
      .findOne(+id)
      .TurnoServicio()
      .then((servicios) => {
        return servicios.map((servicio) => {
          return servicio.servicio_id;
        });
      });

    const usuarios = await this.usuarios.findAll(); //busqueda de usuarios
    const clientes = await this.clientes.findAll(); //busqueda de clientes
    const servicios = await this.servicio.findAll(); //busqueda de servicios
    const edit: boolean = true;
    // console.log(`Turno ${id} editado, redirigiendo a pagina principal ${edit}`);
    console.log(turno);
    return {
      turnos,
      turno,
      usuarios,
      clientes,
      servicios,
      edit,
      serviciosSelected,
    };
  }

  //Funcion para mostrar los detalles de un turno especifico
  @Get("details/turno/:id")
  @Render("detalleTurno")
  async showDetails(@Param("id") id: string) {
    const turno = await this.turnosService
      .findTurnoByClienteId(+id)
      .then((turno) => {
        return {
          ...turno,
          //formateo de fecha y hora
          fecha: format(turno.fecha, "dd-MM-yyyy"),
          hora: format(turno.hora, "HH:mm a"),
        };
      });
    return {
      turno,
    };
  }

  //Funcion para aceptar un turno
  @Get("accept/turno/:id")
  @Redirect("/?realizado=true")
  async acceptTurno(@Param("id") id: string) {
    return this.turnosService.acceptTurno(+id);
  }

  //Funcion para crear un turno
  @Post("/create")
  @Redirect("/?success=true")
  async create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.turnosService.create(createTurnoDto);
  }

  //Funcion para actualizar un turno
  @Post("update/turno/:id")
  @Redirect("/?actualizar=true")
  async update(
    @Param("id") id: string,
    @Body() updateTurnoDto: UpdateTurnoDto
  ) {
    return this.turnosService.update(+id, updateTurnoDto);
  }

  //Funcion para borrar un turno
  @Get("/delete/turno/:id")
  @Redirect("/?borrar=true")
  remove(@Param("id") id: string) {
    return this.turnosService.remove(+id);
  }
}
