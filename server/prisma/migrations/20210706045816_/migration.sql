-- CreateTable
CREATE TABLE "ItemView" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToItemView" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemView.name_unique" ON "ItemView"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToItemView_AB_unique" ON "_ItemToItemView"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToItemView_B_index" ON "_ItemToItemView"("B");

-- AddForeignKey
ALTER TABLE "_ItemToItemView" ADD FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToItemView" ADD FOREIGN KEY ("B") REFERENCES "ItemView"("id") ON DELETE CASCADE ON UPDATE CASCADE;
