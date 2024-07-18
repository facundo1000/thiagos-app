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
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { UsuariosService } from "./usuarios.service";
import { TIPO_DNI } from "@prisma/client";

@Controller("/usuarios")
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @Render("usuariosAbm")
  async findAll(
    @Query("success") success: boolean,
    @Query("borrar") borrar: boolean,
    @Query("actualizar") actualizar: boolean
  ) {
    const users = await this.usuariosService.findAll();
    const tipos = TIPO_DNI;
    return { users, tipos, borrar, success, actualizar };
  }

  @Post("/create")
  @Redirect("/usuarios?success=true")
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const edit: boolean = false;
    const user = this.usuariosService.create(createUsuarioDto);
    return { user, edit };
  }

  @Get("/edit/user/:id")
  @Render("usuariosAbm")
  async edit(@Param("id") id: string) {
    const user = await this.usuariosService.findOne(+id);
    const users = await this.usuariosService.findAll();
    const edit: boolean = true;
    const tipos = TIPO_DNI;
    console.log(`usuario ${id} editado, redirigiendo a /usuarios ${edit}`);
    return { user, users, edit, tipos };
  }

  @Post("/update/user/:id")
  @Redirect("/usuarios?actualizar=true")
  update(@Param("id") id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Get("/delete/user/:id")
  @Redirect("/usuarios?borrar=true")
  async remove(@Param("id") id: string) {
    return this.usuariosService.remove(+id);
  }
}
