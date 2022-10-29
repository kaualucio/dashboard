/*
  Warnings:

  - You are about to drop the column `responsible_email` on the `project` table. All the data in the column will be lost.
  - Added the required column `hirerEmail` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "responsible_email";
ALTER TABLE "project" ADD COLUMN     "hirerEmail" STRING NOT NULL;
