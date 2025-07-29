/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `thuonghieu` (
    `id_thuonghieu` INTEGER NOT NULL AUTO_INCREMENT,
    `tenthuonghieu` VARCHAR(50) NOT NULL,
    `slugthuonghieu` VARCHAR(100) NOT NULL,
    `hinhanh` TEXT NULL,
    `mota` TEXT NULL,
    `trangthai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `thuonghieu_tenthuonghieu_key`(`tenthuonghieu`),
    UNIQUE INDEX `thuonghieu_slugthuonghieu_key`(`slugthuonghieu`),
    PRIMARY KEY (`id_thuonghieu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
