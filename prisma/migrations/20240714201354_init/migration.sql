/*
  Warnings:

  - Added the required column `estado` to the `Turno` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TURNO_ESTADOS" AS ENUM ('PENDIENTE', 'CONFIRMADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TIPO_DNI" AS ENUM ('DNI', 'PASAPORTE', 'LC', 'LE');

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "tipo_dni" "TIPO_DNI";

-- AlterTable
ALTER TABLE "Turno" ADD COLUMN     "estado" "TURNO_ESTADOS" NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "tipo_dni" "TIPO_DNI";
