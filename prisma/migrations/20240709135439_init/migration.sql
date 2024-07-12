-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "activo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Servicio" ALTER COLUMN "activo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Turno" ALTER COLUMN "activo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TurnoServicio" ALTER COLUMN "activo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "activo" DROP NOT NULL;
