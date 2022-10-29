/*
  Warnings:

  - You are about to drop the column `hirerEmail` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `hirerName` on the `project` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "hirerEmail";
ALTER TABLE "project" DROP COLUMN "hirerName";
ALTER TABLE "project" ADD COLUMN     "client_id" STRING NOT NULL;
ALTER TABLE "project" ADD COLUMN     "description" STRING NOT NULL;

-- CreateTable
CREATE TABLE "client" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "image" STRING,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_id_key" ON "client"("id");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
