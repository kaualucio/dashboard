/*
  Warnings:

  - Added the required column `objetive` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "objetive" STRING NOT NULL;
