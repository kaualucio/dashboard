/*
  Warnings:

  - You are about to drop the column `resposible_id` on the `project` table. All the data in the column will be lost.
  - Added the required column `responsible_id` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_resposible_id_fkey";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "resposible_id";
ALTER TABLE "project" ADD COLUMN     "responsible_id" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
