-- CreateTable
CREATE TABLE "project" (
    "id" STRING NOT NULL,
    "hirerName" STRING NOT NULL,
    "title" STRING NOT NULL,
    "resposible_id" STRING NOT NULL,
    "responsible_email" STRING NOT NULL,
    "phone" STRING,
    "type_service" STRING[],
    "budget" FLOAT8 NOT NULL,
    "status" STRING NOT NULL,
    "completed" BOOL NOT NULL,
    "completed_at" TIMESTAMP(3),
    "canceled" BOOL NOT NULL,
    "canceled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_id_key" ON "project"("id");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_resposible_id_fkey" FOREIGN KEY ("resposible_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
