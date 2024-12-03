/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Cliente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Servicio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Servicio` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Turno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Turno` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `usuario_id` on the `Turno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cliente_id` on the `Turno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `turno_id` on the `TurnoServicio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `servicio_id` on the `TurnoServicio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "TurnoServicio" DROP CONSTRAINT "TurnoServicio_servicio_id_fkey";

-- DropForeignKey
ALTER TABLE "TurnoServicio" DROP CONSTRAINT "TurnoServicio_turno_id_fkey";

-- AlterTable
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Servicio" DROP CONSTRAINT "Servicio_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "usuario_id",
ADD COLUMN     "usuario_id" UUID NOT NULL,
DROP COLUMN "cliente_id",
ADD COLUMN     "cliente_id" UUID NOT NULL,
ADD CONSTRAINT "Turno_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TurnoServicio" DROP COLUMN "turno_id",
ADD COLUMN     "turno_id" UUID NOT NULL,
DROP COLUMN "servicio_id",
ADD COLUMN     "servicio_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TurnoServicio" ADD CONSTRAINT "TurnoServicio_turno_id_fkey" FOREIGN KEY ("turno_id") REFERENCES "Turno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TurnoServicio" ADD CONSTRAINT "TurnoServicio_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "Servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
