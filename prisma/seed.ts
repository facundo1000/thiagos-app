/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const registros = await prisma.usuario.createMany({
    data: [
      {
        nombre: "Juan",
        apellido: "Perez",
        dni: 12345678,
        direccion: "Calle Falsa 123",
        email: "some@gmail.com",
        telefono: 29546549,
        ciudad: "Comodoro Rivadavia",
        provincia: "Chubut",
        pais: "Argentina",
        activo: true,
      },
      {
        nombre: "maria",
        apellido: "perez",
        dni: 222666333,
        direccion: "Calle Trucha 123",
        email: "some2@gmail.com",
        telefono: 29546544,
        ciudad: "Comodoro La Pampa",
        provincia: "Buenos Aires",
        pais: "Argentina",
        activo: true,
      },
    ],
  });

  // Clientes
  const clientes = await prisma.cliente.createMany({
    data: [
      {
        nombre: "martin",
        apellido: "lopez",
        dni: 36123654,
        email: "some@aol.com",
        telefono: 36549878,
        activo: true,
      },
      {
        nombre: "juan",
        apellido: "martinez",
        dni: 29789654,
        email: "pepo@hotmail.com",
        telefono: 11987654,
        activo: true,
      },
    ],
  });

  //Turnos
  const turnos = await prisma.turno.createMany({
    data: [
      {
        fecha: new Date(2024, 9, 27, 10, 30, 0, 0),
        usuario_id: 1,
        cliente_id: 1,
        activo: true,
      },
      {
        fecha: new Date(2024, 1, 10, 11, 30, 0, 0),
        cliente_id: 2,
        usuario_id: 2,
        activo: true,
      },
    ],
  });

  // Servicios
  const servicios = await prisma.servicio.createMany({
    data: [
      {
        nombre: "corte de pelo",
        precio: 1500,
        activo: true,
      },
      {
        nombre: "depilacion",
        precio: 1800,
        activo: true,
      },
    ],
  });

  //Tabla intermedia TurnoServicio
  const turnos_servicios = await prisma.turnoServicio.createMany({
    data: [
      {
        turno_id: 1,
        servicio_id: 1,
        activo: true,
      },
      {
        turno_id: 2,
        servicio_id: 2,
        activo: true,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
