/*
  Warnings:

  - A unique constraint covering the columns `[usuario_id]` on the table `Turno` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Turno" ALTER COLUMN "estado" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Turno_usuario_id_key" ON "Turno"("usuario_id");
