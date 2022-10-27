-- CreateTable
CREATE TABLE "testimonial" (
    "id" STRING NOT NULL,
    "hirerName" STRING NOT NULL,
    "hirerEmail" STRING NOT NULL,
    "hirerPhone" STRING,
    "testimonial" STRING NOT NULL,
    "ordered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testimonial_id_key" ON "testimonial"("id");
