/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin.username_unique" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.username_unique" ON "Customer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Item.name_unique" ON "Item"("name");
