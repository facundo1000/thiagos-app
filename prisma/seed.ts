/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, TIPO_DNI, TURNO_ESTADOS } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  //TODO: agregar uuid a todas las tablas, FUNCIONA PARA USUARIOS y TURNOS, y la relacion entre estos.
  // Create usuarios and obtain their ids
  const registros = await Promise.all([
    prisma.usuario.create({
      data: {
        nombre: "Juan",
        apellido: "Perez",
        tipo_dni: TIPO_DNI.DNI,
        dni: 12345678,
        direccion: "Calle Falsa 123",
        email: "some@gmail.com",
        telefono: 29546549,
        ciudad: "Comodoro Rivadavia",
        provincia: "Chubut",
        pais: "Argentina",
        activo: true,
      },
    }),
    prisma.usuario.create({
      data: {
        nombre: "Maria",
        apellido: "Perez",
        tipo_dni: TIPO_DNI.DNI,
        dni: 222666333,
        direccion: "Calle Trucha 123",
        email: "some2@gmail.com",
        telefono: 29546544,
        ciudad: "Comodoro La Pampa",
        provincia: "Buenos Aires",
        pais: "Argentina",
        activo: true,
      },
    }),
  ]);


  // Clientes
  const clientes = await Promise.all([
    prisma.cliente.create({
      data: {
        nombre: "martin",
        apellido: "lopez",
        tipo_dni: TIPO_DNI.DNI,
        dni: 36123654,
        email: "some@aol.com",
        telefono: 36549878,
        activo: true,
      },
    }),
    prisma.cliente.create({
      data: {
        nombre: "juan",
        apellido: "martinez",
        tipo_dni: TIPO_DNI.DNI,
        dni: 29789654,
        email: "pepo@hotmail.com",
        telefono: 11987654,
        activo: true,
      },
    }),
  ]);

  const servicios = await Promise.all([
    prisma.servicio.create({
      data: {
        nombre: "corte de pelo",
        precio: 1500,
        activo: true,
      },
    }),
    prisma.servicio.create({
      data: {
        nombre: "depilacion",
        precio: 1800,
        activo: true,
      },
    }),
  ]);

  //Turnos
  const turnos = await Promise.all([
    prisma.turno.create({
      data: {
        fecha: new Date(2024, 9, 27),
        hora: new Date(Date.UTC(0, 0, 0, 10, 30)),
        usuario_id: registros[0].id,
        cliente_id: clientes[0].id,
        estado: TURNO_ESTADOS.PENDIENTE,
        activo: true,
      },
    }),
    prisma.turno.create({
      data: {
        fecha: new Date(2024, 1, 10),
        hora: new Date(Date.UTC(0, 0, 0, 11, 33)),
        cliente_id: clientes[1].id,
        usuario_id: registros[1].id,
        estado: TURNO_ESTADOS.PENDIENTE,
        activo: true,
      },
    }),
  ]);


  //Tabla intermedia TurnoServicio
  const turnos_servicios = await prisma.turnoServicio.createMany({
    data: [
      {
        turno_id: turnos[0].id,
        servicio_id: servicios[0].id,
        activo: true,
      },
      {
        turno_id: turnos[1].id,
        servicio_id: servicios[1].id,
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
