/*
  Warnings:

  - Added the required column `hora` to the `Turno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servicio" ALTER COLUMN "baja_fecha" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Turno" ADD COLUMN     "hora" TIME(3) NOT NULL,
ALTER COLUMN "fecha" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "baja_fecha" SET DEFAULT CURRENT_TIMESTAMP;
