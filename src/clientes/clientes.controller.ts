/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Render } from "@nestjs/common";
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
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get("/edit/cliente/:id")
  findOne(@Param("id") id: string) {
    const cliente = this.clientesService.findOne(+id);
    const clientes = this.clientesService.findAll();
    const tipos = TIPO_DNI;
    const edit: boolean = true;
    return { cliente, clientes, tipos, edit };
  }

  @Post("/update/cliente/:id")
  update(@Param("id") id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+id, updateClienteDto);
  }

  @Get(":id")
  remove(@Param("id") id: string) {
    return this.clientesService.remove(+id);
  }
}
