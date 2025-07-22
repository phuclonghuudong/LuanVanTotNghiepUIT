-- CreateTable
CREATE TABLE `loaisanpham` (
    `id_loai` INTEGER NOT NULL AUTO_INCREMENT,
    `tenloai` VARCHAR(50) NOT NULL,
    `slugloai` VARCHAR(100) NOT NULL,
    `hinhanh` TEXT NULL,
    `mota` TEXT NULL,
    `trangthai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `loaisanpham_tenloai_key`(`tenloai`),
    UNIQUE INDEX `loaisanpham_slugloai_key`(`slugloai`),
    PRIMARY KEY (`id_loai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
