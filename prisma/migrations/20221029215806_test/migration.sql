/*
  Warnings:

  - You are about to drop the column `objetive` on the `project` table. All the data in the column will be lost.
  - Added the required column `objective` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "objetive";
ALTER TABLE "project" ADD COLUMN     "objective" STRING NOT NULL;
