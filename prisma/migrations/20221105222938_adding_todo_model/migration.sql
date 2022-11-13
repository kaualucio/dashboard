-- CreateTable
CREATE TABLE "todo" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "author_id" STRING NOT NULL,
    "completed_by_user_id" STRING,
    "priority" STRING NOT NULL,
    "has_to_start_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "has_to_finish_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_in_time" BOOL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todo_id_key" ON "todo"("id");

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_completed_by_user_id_fkey" FOREIGN KEY ("completed_by_user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
