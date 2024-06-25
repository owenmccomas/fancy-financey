-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "currentAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'In Progress',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Goal_category_idx" ON "Goal"("category");

-- CreateIndex
CREATE INDEX "Goal_status_idx" ON "Goal"("status");

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
