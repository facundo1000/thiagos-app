/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { UsuariosController } from "./usuarios.controller";
import { ConnectorModule } from "../connector/connector.module";

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [ConnectorModule],
})
export class UsuariosModule {}
