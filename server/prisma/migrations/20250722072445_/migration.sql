/*
  Warnings:

  - The primary key for the `loaisanpham` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hinhanh` on the `loaisanpham` table. All the data in the column will be lost.
  - You are about to drop the column `id_loai` on the `loaisanpham` table. All the data in the column will be lost.
  - You are about to drop the column `mota` on the `loaisanpham` table. All the data in the column will be lost.
  - You are about to drop the column `slugloai` on the `loaisanpham` table. All the data in the column will be lost.
  - You are about to drop the column `tenloai` on the `loaisanpham` table. All the data in the column will be lost.
  - You are about to drop the column `trangthai` on the `loaisanpham` table. All the data in the column will be lost.
  - The primary key for the `thuonghieu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hinhanh` on the `thuonghieu` table. All the data in the column will be lost.
  - You are about to drop the column `id_thuonghieu` on the `thuonghieu` table. All the data in the column will be lost.
  - You are about to drop the column `mota` on the `thuonghieu` table. All the data in the column will be lost.
  - You are about to drop the column `slugthuonghieu` on the `thuonghieu` table. All the data in the column will be lost.
  - You are about to drop the column `tenthuonghieu` on the `thuonghieu` table. All the data in the column will be lost.
  - You are about to drop the column `trangthai` on the `thuonghieu` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenLoai]` on the table `LoaiSanPham` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slugLoai]` on the table `LoaiSanPham` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenThuongHieu]` on the table `ThuongHieu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slugThuongHieu]` on the table `ThuongHieu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `LoaiSanPham` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slugLoai` to the `LoaiSanPham` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenLoai` to the `LoaiSanPham` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trangThai` to the `LoaiSanPham` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `ThuongHieu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slugThuongHieu` to the `ThuongHieu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenThuongHieu` to the `ThuongHieu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trangThai` to the `ThuongHieu` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `loaisanpham_slugloai_key` ON `loaisanpham`;

-- DropIndex
DROP INDEX `loaisanpham_tenloai_key` ON `loaisanpham`;

-- DropIndex
DROP INDEX `thuonghieu_slugthuonghieu_key` ON `thuonghieu`;

-- DropIndex
DROP INDEX `thuonghieu_tenthuonghieu_key` ON `thuonghieu`;

-- AlterTable
ALTER TABLE `loaisanpham` DROP PRIMARY KEY,
    DROP COLUMN `hinhanh`,
    DROP COLUMN `id_loai`,
    DROP COLUMN `mota`,
    DROP COLUMN `slugloai`,
    DROP COLUMN `tenloai`,
    DROP COLUMN `trangthai`,
    ADD COLUMN `hinhAnh` TEXT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `moTa` TEXT NULL,
    ADD COLUMN `slugLoai` VARCHAR(100) NOT NULL,
    ADD COLUMN `tenLoai` VARCHAR(50) NOT NULL,
    ADD COLUMN `trangThai` TINYINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `thuonghieu` DROP PRIMARY KEY,
    DROP COLUMN `hinhanh`,
    DROP COLUMN `id_thuonghieu`,
    DROP COLUMN `mota`,
    DROP COLUMN `slugthuonghieu`,
    DROP COLUMN `tenthuonghieu`,
    DROP COLUMN `trangthai`,
    ADD COLUMN `hinhAnh` TEXT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `moTa` TEXT NULL,
    ADD COLUMN `slugThuongHieu` VARCHAR(100) NOT NULL,
    ADD COLUMN `tenThuongHieu` VARCHAR(50) NOT NULL,
    ADD COLUMN `trangThai` TINYINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `BinhLuanSanPham` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noiDung` TEXT NOT NULL,
    `thoiGian` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `trangThai` TINYINT NOT NULL,
    `sanPhamId` INTEGER NOT NULL,
    `khachHangId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTietGioHang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gioHangId` INTEGER NOT NULL,
    `chiTietSanPhamId` INTEGER NOT NULL,
    `soLuong` INTEGER NOT NULL,
    `donGia` INTEGER NOT NULL,
    `tongTien` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTietHoaDon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soLuong` INTEGER NOT NULL,
    `giaBanTaiThoiDiem` DECIMAL(10, 2) NULL,
    `phanTramGiam` DECIMAL(5, 2) NULL,
    `giaSauGiam` DECIMAL(10, 2) NULL,
    `donViTinh` VARCHAR(50) NULL,
    `ghiChu` VARCHAR(255) NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `hoaDonId` INTEGER NOT NULL,
    `chiTietSanPhamId` INTEGER NOT NULL,
    `chiTietKhuyenMaiId` INTEGER NULL,

    INDEX `ChiTietHoaDon_hoaDonId_idx`(`hoaDonId`),
    INDEX `ChiTietHoaDon_chiTietSanPhamId_idx`(`chiTietSanPhamId`),
    INDEX `ChiTietHoaDon_chiTietKhuyenMaiId_idx`(`chiTietKhuyenMaiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTietKhuyenMai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loaiGia` VARCHAR(50) NOT NULL,
    `phanTramGiam` DOUBLE NULL,
    `giaKhuyenMai` DECIMAL(10, 2) NULL,
    `soLuongToiThieu` INTEGER NULL,
    `giaGiamTheoSoLuong` DECIMAL(10, 2) NULL,
    `giaGocLucKhuyenMai` DECIMAL(10, 2) NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `khuyenMaiId` INTEGER NOT NULL,
    `chiTietSanPhamId` INTEGER NOT NULL,

    INDEX `ChiTietKhuyenMai_khuyenMaiId_idx`(`khuyenMaiId`),
    INDEX `ChiTietKhuyenMai_chiTietSanPhamId_idx`(`chiTietSanPhamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChiTietSanPham` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maBarCode` VARCHAR(50) NOT NULL,
    `maChiTiet` VARCHAR(50) NOT NULL,
    `slugChiTiet` VARCHAR(100) NOT NULL,
    `giaBan` DECIMAL(10, 2) NULL,
    `giaNhap` DECIMAL(10, 2) NULL,
    `giaVonTB` DECIMAL(10, 2) NULL,
    `moTa` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sanPhamId` INTEGER NOT NULL,
    `mauSacId` INTEGER NOT NULL,
    `kichCoId` INTEGER NOT NULL,

    UNIQUE INDEX `ChiTietSanPham_maBarCode_key`(`maBarCode`),
    UNIQUE INDEX `ChiTietSanPham_maChiTiet_key`(`maChiTiet`),
    UNIQUE INDEX `ChiTietSanPham_slugChiTiet_key`(`slugChiTiet`),
    INDEX `ChiTietSanPham_sanPhamId_idx`(`sanPhamId`),
    INDEX `ChiTietSanPham_mauSacId_idx`(`mauSacId`),
    INDEX `ChiTietSanPham_kichCoId_idx`(`kichCoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DanhGiaSanPham` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soSao` TINYINT NULL,
    `noiDung` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `khachHangId` INTEGER NOT NULL,
    `sanPhamId` INTEGER NOT NULL,

    INDEX `DanhGiaSanPham_khachHangId_idx`(`khachHangId`),
    INDEX `DanhGiaSanPham_sanPhamId_idx`(`sanPhamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiaChi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diaChi` VARCHAR(255) NOT NULL,
    `soDienThoai` VARCHAR(20) NOT NULL,
    `tenNguoiNhan` VARCHAR(100) NOT NULL,
    `isMain` BOOLEAN NOT NULL DEFAULT false,
    `ghiChu` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `khachHangId` INTEGER NOT NULL,

    INDEX `DiaChi_khachHangId_idx`(`khachHangId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GioHang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tongTienGoc` DECIMAL(12, 2) NOT NULL,
    `tongGiaGiam` DECIMAL(12, 2) NOT NULL,
    `ngayCapNhat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ghiChu` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `khachHangId` INTEGER NOT NULL,

    INDEX `GioHang_khachHangId_idx`(`khachHangId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HinhAnhChiTietSanPham` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `duongDan` TEXT NOT NULL,
    `isMain` BOOLEAN NOT NULL DEFAULT false,
    `moTa` VARCHAR(255) NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `chiTietSanPhamId` INTEGER NOT NULL,

    INDEX `HinhAnhChiTietSanPham_chiTietSanPhamId_idx`(`chiTietSanPhamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HinhAnhSanPham` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `duongDan` TEXT NOT NULL,
    `isMain` BOOLEAN NOT NULL DEFAULT false,
    `moTa` VARCHAR(255) NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sanPhamId` INTEGER NOT NULL,

    INDEX `HinhAnhSanPham_sanPhamId_idx`(`sanPhamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HoaDon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maHoaDon` VARCHAR(50) NOT NULL,
    `ngayLap` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tongTien` DECIMAL(10, 2) NULL,
    `tongTienGoc` DECIMAL(10, 2) NULL,
    `tongGiamGia` DECIMAL(10, 2) NULL,
    `hinhThucThanhToan` VARCHAR(50) NULL,
    `ngayGiaoHangDuKien` DATETIME(3) NULL,
    `ngayGiao` DATETIME(3) NULL,
    `daGiaoHang` BOOLEAN NOT NULL DEFAULT false,
    `ghiChu` VARCHAR(255) NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `khachHangId` INTEGER NOT NULL,
    `nhanVienId` INTEGER NOT NULL,
    `khuyenMaiId` INTEGER NULL,

    UNIQUE INDEX `HoaDon_maHoaDon_key`(`maHoaDon`),
    INDEX `HoaDon_khachHangId_idx`(`khachHangId`),
    INDEX `HoaDon_khuyenMaiId_idx`(`khuyenMaiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KhachHang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(100) NOT NULL,
    `ngaySinh` DATETIME(3) NOT NULL,
    `gioiTinh` INTEGER NOT NULL,
    `diemTichLuy` INTEGER NOT NULL,
    `diaChi` VARCHAR(255) NULL,
    `avatar` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `taiKhoanId` INTEGER NOT NULL,

    UNIQUE INDEX `KhachHang_taiKhoanId_key`(`taiKhoanId`),
    INDEX `KhachHang_taiKhoanId_idx`(`taiKhoanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KhuyenMai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenKhuyenMai` VARCHAR(50) NOT NULL,
    `slugKhuyenMai` VARCHAR(100) NOT NULL,
    `hinhAnh` TEXT NULL,
    `moTa` TEXT NULL,
    `ngayBatDau` DATETIME(3) NULL,
    `ngayKetThuc` DATETIME(3) NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `loaiKhuyenMaiId` INTEGER NOT NULL,

    UNIQUE INDEX `KhuyenMai_tenKhuyenMai_key`(`tenKhuyenMai`),
    UNIQUE INDEX `KhuyenMai_slugKhuyenMai_key`(`slugKhuyenMai`),
    INDEX `KhuyenMai_loaiKhuyenMaiId_idx`(`loaiKhuyenMaiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KichCo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenKichCo` VARCHAR(50) NOT NULL,
    `maKichCo` VARCHAR(100) NOT NULL,
    `moTa` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `KichCo_tenKichCo_key`(`tenKichCo`),
    UNIQUE INDEX `KichCo_maKichCo_key`(`maKichCo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoaiKhuyenMai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenKhuyenMai` VARCHAR(50) NOT NULL,
    `moTa` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LoaiKhuyenMai_tenKhuyenMai_key`(`tenKhuyenMai`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MauSac` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenMauSac` VARCHAR(50) NOT NULL,
    `maMauSac` VARCHAR(100) NOT NULL,
    `hexCode` VARCHAR(100) NOT NULL,
    `moTa` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MauSac_tenMauSac_key`(`tenMauSac`),
    UNIQUE INDEX `MauSac_maMauSac_key`(`maMauSac`),
    UNIQUE INDEX `MauSac_hexCode_key`(`hexCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NhanVien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(100) NOT NULL,
    `ngaySinh` DATETIME(3) NOT NULL,
    `gioiTinh` INTEGER NOT NULL,
    `CCCD` INTEGER NOT NULL,
    `diaChi` VARCHAR(255) NULL,
    `avatar` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `taiKhoanId` INTEGER NOT NULL,

    UNIQUE INDEX `NhanVien_taiKhoanId_key`(`taiKhoanId`),
    INDEX `NhanVien_taiKhoanId_idx`(`taiKhoanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quyen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenQuyen` VARCHAR(100) NOT NULL,
    `maQuyen` VARCHAR(100) NOT NULL,
    `moTa` VARCHAR(191) NULL,
    `trangThai` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SanPham` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenSanPham` VARCHAR(50) NOT NULL,
    `maSanPham` VARCHAR(50) NOT NULL,
    `slugSanPham` VARCHAR(100) NOT NULL,
    `luotXem` TINYINT NULL,
    `hinhAnh` TEXT NULL,
    `moTa` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `thuongHieuId` INTEGER NOT NULL,
    `loaiSanPhamId` INTEGER NOT NULL,

    UNIQUE INDEX `SanPham_tenSanPham_key`(`tenSanPham`),
    UNIQUE INDEX `SanPham_maSanPham_key`(`maSanPham`),
    UNIQUE INDEX `SanPham_slugSanPham_key`(`slugSanPham`),
    INDEX `SanPham_loaiSanPhamId_idx`(`loaiSanPhamId`),
    INDEX `SanPham_thuongHieuId_idx`(`thuongHieuId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaiKhoan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenDangNhap` VARCHAR(100) NOT NULL,
    `matKhau` VARCHAR(255) NOT NULL,
    `loaiTaiKhoan` INTEGER NOT NULL,
    `soDienThoai` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `emailXacThuc` TEXT NULL,
    `otpXacThuc` TEXT NULL,
    `otpHetHan` DATETIME(3) NULL,
    `refreshToken` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `quyenId` INTEGER NOT NULL,

    UNIQUE INDEX `TaiKhoan_tenDangNhap_key`(`tenDangNhap`),
    UNIQUE INDEX `TaiKhoan_soDienThoai_key`(`soDienThoai`),
    UNIQUE INDEX `TaiKhoan_email_key`(`email`),
    INDEX `TaiKhoan_quyenId_idx`(`quyenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TinTuc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tieuDe` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(150) NOT NULL,
    `luotXem` INTEGER NOT NULL DEFAULT 0,
    `noiDung` TEXT NOT NULL,
    `hinhAnh` VARCHAR(255) NULL,
    `ghiChu` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nhanVienId` INTEGER NOT NULL,

    UNIQUE INDEX `TinTuc_slug_key`(`slug`),
    INDEX `TinTuc_nhanVienId_idx`(`nhanVienId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TonKho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ngayCapNhat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `soLuongTon` INTEGER NOT NULL,
    `soLuongKhaDung` INTEGER NOT NULL,
    `giaBan` DECIMAL(10, 2) NULL,
    `ghiChu` TEXT NULL,
    `trangThai` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `chiTietSanPhamId` INTEGER NOT NULL,

    INDEX `TonKho_chiTietSanPhamId_idx`(`chiTietSanPhamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `LoaiSanPham_tenLoai_key` ON `LoaiSanPham`(`tenLoai`);

-- CreateIndex
CREATE UNIQUE INDEX `LoaiSanPham_slugLoai_key` ON `LoaiSanPham`(`slugLoai`);

-- CreateIndex
CREATE UNIQUE INDEX `ThuongHieu_tenThuongHieu_key` ON `ThuongHieu`(`tenThuongHieu`);

-- CreateIndex
CREATE UNIQUE INDEX `ThuongHieu_slugThuongHieu_key` ON `ThuongHieu`(`slugThuongHieu`);

-- AddForeignKey
ALTER TABLE `BinhLuanSanPham` ADD CONSTRAINT `BinhLuanSanPham_sanPhamId_fkey` FOREIGN KEY (`sanPhamId`) REFERENCES `SanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BinhLuanSanPham` ADD CONSTRAINT `BinhLuanSanPham_khachHangId_fkey` FOREIGN KEY (`khachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietGioHang` ADD CONSTRAINT `ChiTietGioHang_gioHangId_fkey` FOREIGN KEY (`gioHangId`) REFERENCES `GioHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietGioHang` ADD CONSTRAINT `ChiTietGioHang_chiTietSanPhamId_fkey` FOREIGN KEY (`chiTietSanPhamId`) REFERENCES `ChiTietSanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietHoaDon` ADD CONSTRAINT `ChiTietHoaDon_hoaDonId_fkey` FOREIGN KEY (`hoaDonId`) REFERENCES `HoaDon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietHoaDon` ADD CONSTRAINT `ChiTietHoaDon_chiTietSanPhamId_fkey` FOREIGN KEY (`chiTietSanPhamId`) REFERENCES `ChiTietSanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietHoaDon` ADD CONSTRAINT `ChiTietHoaDon_chiTietKhuyenMaiId_fkey` FOREIGN KEY (`chiTietKhuyenMaiId`) REFERENCES `ChiTietKhuyenMai`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietKhuyenMai` ADD CONSTRAINT `ChiTietKhuyenMai_khuyenMaiId_fkey` FOREIGN KEY (`khuyenMaiId`) REFERENCES `KhuyenMai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietKhuyenMai` ADD CONSTRAINT `ChiTietKhuyenMai_chiTietSanPhamId_fkey` FOREIGN KEY (`chiTietSanPhamId`) REFERENCES `ChiTietSanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietSanPham` ADD CONSTRAINT `ChiTietSanPham_sanPhamId_fkey` FOREIGN KEY (`sanPhamId`) REFERENCES `SanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietSanPham` ADD CONSTRAINT `ChiTietSanPham_mauSacId_fkey` FOREIGN KEY (`mauSacId`) REFERENCES `MauSac`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChiTietSanPham` ADD CONSTRAINT `ChiTietSanPham_kichCoId_fkey` FOREIGN KEY (`kichCoId`) REFERENCES `KichCo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DanhGiaSanPham` ADD CONSTRAINT `DanhGiaSanPham_khachHangId_fkey` FOREIGN KEY (`khachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DanhGiaSanPham` ADD CONSTRAINT `DanhGiaSanPham_sanPhamId_fkey` FOREIGN KEY (`sanPhamId`) REFERENCES `SanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiaChi` ADD CONSTRAINT `DiaChi_khachHangId_fkey` FOREIGN KEY (`khachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GioHang` ADD CONSTRAINT `GioHang_khachHangId_fkey` FOREIGN KEY (`khachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HinhAnhChiTietSanPham` ADD CONSTRAINT `HinhAnhChiTietSanPham_chiTietSanPhamId_fkey` FOREIGN KEY (`chiTietSanPhamId`) REFERENCES `ChiTietSanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HinhAnhSanPham` ADD CONSTRAINT `HinhAnhSanPham_sanPhamId_fkey` FOREIGN KEY (`sanPhamId`) REFERENCES `SanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HoaDon` ADD CONSTRAINT `HoaDon_khachHangId_fkey` FOREIGN KEY (`khachHangId`) REFERENCES `KhachHang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HoaDon` ADD CONSTRAINT `HoaDon_nhanVienId_fkey` FOREIGN KEY (`nhanVienId`) REFERENCES `NhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HoaDon` ADD CONSTRAINT `HoaDon_khuyenMaiId_fkey` FOREIGN KEY (`khuyenMaiId`) REFERENCES `KhuyenMai`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KhachHang` ADD CONSTRAINT `KhachHang_taiKhoanId_fkey` FOREIGN KEY (`taiKhoanId`) REFERENCES `TaiKhoan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KhuyenMai` ADD CONSTRAINT `KhuyenMai_loaiKhuyenMaiId_fkey` FOREIGN KEY (`loaiKhuyenMaiId`) REFERENCES `LoaiKhuyenMai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NhanVien` ADD CONSTRAINT `NhanVien_taiKhoanId_fkey` FOREIGN KEY (`taiKhoanId`) REFERENCES `TaiKhoan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SanPham` ADD CONSTRAINT `SanPham_thuongHieuId_fkey` FOREIGN KEY (`thuongHieuId`) REFERENCES `ThuongHieu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SanPham` ADD CONSTRAINT `SanPham_loaiSanPhamId_fkey` FOREIGN KEY (`loaiSanPhamId`) REFERENCES `LoaiSanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaiKhoan` ADD CONSTRAINT `TaiKhoan_quyenId_fkey` FOREIGN KEY (`quyenId`) REFERENCES `Quyen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TinTuc` ADD CONSTRAINT `TinTuc_nhanVienId_fkey` FOREIGN KEY (`nhanVienId`) REFERENCES `NhanVien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TonKho` ADD CONSTRAINT `TonKho_chiTietSanPhamId_fkey` FOREIGN KEY (`chiTietSanPhamId`) REFERENCES `ChiTietSanPham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
