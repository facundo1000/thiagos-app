/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientesModule } from "./clientes/clientes.module";
import { ConnectorModule } from "./connector/connector.module";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { TurnosModule } from './turnos/turnos.module';
import { ServiciosModule } from './servicios/servicios.module';

@Module({
  imports: [UsuariosModule, ConnectorModule, ClientesModule, TurnosModule, ServiciosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
