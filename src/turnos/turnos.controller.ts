/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from "@nestjs/common";
import { TurnosService } from "./turnos.service";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";

@Controller("/")
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Get()
  @Render("turnos")
  findAll() {
    return this.turnosService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.turnosService.findOne(+id);
  }

  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
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
