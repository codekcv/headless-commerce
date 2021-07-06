/*
  Warnings:

  - You are about to drop the `_CustomerToItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItemToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CustomerToItem" DROP CONSTRAINT "_CustomerToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToItem" DROP CONSTRAINT "_CustomerToItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "orderId" TEXT;

-- DropTable
DROP TABLE "_CustomerToItem";

-- DropTable
DROP TABLE "_ItemToOrder";

-- AddForeignKey
ALTER TABLE "Item" ADD FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
