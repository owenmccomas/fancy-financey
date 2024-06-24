-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bill_category_idx" ON "Bill"("category");

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
