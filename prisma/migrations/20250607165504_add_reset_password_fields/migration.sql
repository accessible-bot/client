/*
  Warnings:

  - The values [USUARIO_COMUM] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('PROFESSOR', 'CUIDADOR', 'RESPONSAVEL', 'USUARIO', 'TEA_NIVEL_1', 'TEA_NIVEL_2', 'TEA_NIVEL_3');
ALTER TABLE "User" ALTER COLUMN "userType" TYPE "UserType_new" USING ("userType"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;
