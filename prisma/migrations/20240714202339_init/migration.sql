/*
  Warnings:

  - The values [CONFIRMADO] on the enum `TURNO_ESTADOS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TURNO_ESTADOS_new" AS ENUM ('PENDIENTE', 'REALIZADO', 'CANCELADO');
ALTER TABLE "Turno" ALTER COLUMN "estado" TYPE "TURNO_ESTADOS_new" USING ("estado"::text::"TURNO_ESTADOS_new");
ALTER TYPE "TURNO_ESTADOS" RENAME TO "TURNO_ESTADOS_old";
ALTER TYPE "TURNO_ESTADOS_new" RENAME TO "TURNO_ESTADOS";
DROP TYPE "TURNO_ESTADOS_old";
COMMIT;
