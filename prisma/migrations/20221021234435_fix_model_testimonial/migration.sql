/*
  Warnings:

  - You are about to drop the column `hirerPhone` on the `testimonial` table. All the data in the column will be lost.
  - Added the required column `hirerCompany` to the `testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "testimonial" DROP COLUMN "hirerPhone";
ALTER TABLE "testimonial" ADD COLUMN     "hirerCompany" STRING NOT NULL;
