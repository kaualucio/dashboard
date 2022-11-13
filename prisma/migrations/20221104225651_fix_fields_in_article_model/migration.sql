-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_authorId_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_categoryId_fkey";

-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "categoryId" DROP NOT NULL;
ALTER TABLE "articles" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
