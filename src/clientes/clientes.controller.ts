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
import { TIPO_DNI } from "@prisma/client";
import { ClientesService } from "./clientes.service";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";

@Controller("/clientes")
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  @Render("clientesAbm")
  async findAll(
    @Query("success") success: boolean,
    @Query("borrar") borrar: boolean,
    @Query("actualizar") actualizar: boolean
  ) {
    const clientes = await this.clientesService.findAll();
    const tipos = TIPO_DNI;
    return { clientes, tipos, borrar, success, actualizar };
  }

  @Post("/create")
  @Redirect("/clientes?success=true")
  async create(@Body() createClienteDto: CreateClienteDto) {
    const cliente = await this.clientesService.create(createClienteDto);
    return { cliente };
  }

  @Get("/edit/cliente/:id")
  @Render("clientesAbm")
  async edit(@Param("id") id: string) {
    const cliente = await this.clientesService.findOne(id);
    const clientes = await this.clientesService.findAll();
    const tipos = TIPO_DNI;
    const edit: boolean = true;
    return { cliente, clientes, tipos, edit };
  }

  @Post("/update/cliente/:id")
  @Redirect("/clientes?actualizar=true")
  update(@Param("id") id: string, @Body() updateClienteDto: UpdateClienteDto) {
    this.clientesService.update(id, updateClienteDto);
  }

  @Get("/delete/cliente/:id")
  @Redirect("/clientes?borrar=true")
  async remove(@Param("id") id: string) {
    this.clientesService.remove(id);
  }
}
