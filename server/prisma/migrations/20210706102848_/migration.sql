/*
  Warnings:

  - You are about to drop the column `description` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `_ItemToItemView` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemViewId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ItemToItemView" DROP CONSTRAINT "_ItemToItemView_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToItemView" DROP CONSTRAINT "_ItemToItemView_B_fkey";

-- DropIndex
DROP INDEX "Item.name_unique";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "itemViewId" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "_ItemToItemView";

-- AddForeignKey
ALTER TABLE "Item" ADD FOREIGN KEY ("itemViewId") REFERENCES "ItemView"("id") ON DELETE CASCADE ON UPDATE CASCADE;
