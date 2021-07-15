/*
  Warnings:

  - You are about to drop the column `itemViewId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `ItemView` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referenceId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_itemViewId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_orderId_fkey";

-- DropIndex
DROP INDEX "Order.reference_unique";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "itemViewId",
DROP COLUMN "orderId",
DROP COLUMN "quantity",
DROP COLUMN "total",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "reference",
ADD COLUMN     "referenceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ItemView";

-- CreateTable
CREATE TABLE "ItemInOrder" (
    "id" TEXT NOT NULL,
    "itemViewId" TEXT NOT NULL,
    "orderId" TEXT,
    "quantity" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item.name_unique" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Order.referenceId_unique" ON "Order"("referenceId");

-- AddForeignKey
ALTER TABLE "ItemInOrder" ADD FOREIGN KEY ("itemViewId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInOrder" ADD FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
