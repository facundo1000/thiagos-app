/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
  async findAll() {
    const clientes = await this.clientesService.findAll();
    const tipos = TIPO_DNI;
    return { clientes, tipos };
  }

  @Post("/create")
  @Redirect("/clientes")
  async create(@Body() createClienteDto: CreateClienteDto) {
    const edit: boolean = false;
    const cliente = await this.clientesService.create(createClienteDto);
    return { cliente, edit };
  }

  @Get("/edit/cliente/:id")
  @Render("clientesAbm")
  async edit(@Param("id") id: string) {
    const cliente = await this.clientesService.findOne(+id);
    const clientes = await this.clientesService.findAll();
    const tipos = TIPO_DNI;
    const edit: boolean = true;
    return { cliente, clientes, tipos, edit };
  }

  @Post("/update/cliente/:id")
  @Redirect("/clientes")
  update(@Param("id") id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+id, updateClienteDto);
  }

  @Get("/delete/cliente/:id")
  @Redirect("/clientes")
  async remove(@Param("id") id: string) {
    return this.clientesService.remove(+id);
  }
}
