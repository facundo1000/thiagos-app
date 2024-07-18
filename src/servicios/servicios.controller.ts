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
import { CreateServicioDto } from "./dto/create-servicio.dto";
import { UpdateServicioDto } from "./dto/update-servicio.dto";
import { ServiciosService } from "./servicios.service";

@Controller("/servicios")
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  //Funcion para buscar todos los servicios
  @Get()
  @Render("servicios")
  async findAll(
    @Query("success") success: boolean,
    @Query("borrar") borrar: boolean,
    @Query("actualizar") actualizar: boolean
  ) {
    const servicios = await this.serviciosService.findAll();
    return { servicios, borrar, success, actualizar };
  }

  //Funcion para crear servicio
  @Post("/create")
  @Redirect("/servicios?success=true")
  async create(@Body() createServicioDto: CreateServicioDto) {
    const servicio = await this.serviciosService.create(createServicioDto);
    const edit: boolean = false;
    return { servicio, edit };
  }

  //Funcion para buscar servicio por id
  @Get("/edit/servicio/:id")
  @Render("servicios")
  async edit(@Param("id") id: string) {
    const servicio = await this.serviciosService.findOne(+id);
    const servicios = await this.serviciosService.findAll();
    const edit: boolean = true;
    return { servicio, servicios, edit };
  }

  //Funcion para actualizar servicio
  @Post("/update/servicio/:id")
  @Redirect("/servicios?actualizar=true")
  update(
    @Param("id") id: string,
    @Body() updateServicioDto: UpdateServicioDto
  ) {
    return this.serviciosService.update(+id, updateServicioDto);
  }

  //Funcion para eliminar servicio
  @Get("/delete/servicio/:id")
  @Redirect("/servicios?borrar=true")
  remove(@Param("id") id: string) {
    this.serviciosService.remove(+id);
  }
}
