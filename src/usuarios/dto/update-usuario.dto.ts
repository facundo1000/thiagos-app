/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { CreateUsuarioDto } from "./create-usuario.dto";

/**
 * Clase que contiene los atributos a ser actualizados de un usuario.
 * Esto creará un nuevo tipo basado en UpdateUsuarioDto donde todos los campos son opcionales.
 * Este enfoque mantiene tu código limpio y sigue el principio DRY (Don't Repeat Yourself),
 * ya que no necesitas redefinir todos los campos de UpdateUsuarioDto manualmente para hacerlos opcionales.
 */
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
