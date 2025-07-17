# 🎓 LUẬN VĂN TỐT NGHIỆP: NGHIÊN CỨU VÀ PHÁT TRIỂN HỆ THỐNG WEBSITE BÁN HÀNG THỜI TRANG

- **Cán bộ hướng dẫn:** ThS. Hà Lê Hoài Trung

## Sinh viên thực hiện:

- **Sinh Viên 1:** Phạm Hồng Phúc - MSSV: 24410086
- **Sinh Viên 2:** Đỗ Hùng Mạnh - MSSV: 24410067

---

## Mục tiêu đề tài

- Nghiên cứu và phát triển hệ thống website bán hàng thời trang hiện đại, đáp ứng nghiệp vụ thực tế của các cửa hàng thời trang.
- Xây dựng website có API phục vụ kết nối giữa frontend và backend.
- Phát triển trang quản trị (Admin Dashboard) cho phép quản lý sản phẩm, đơn hàng, người dùng, khuyến mãi,…
- Triển khai hệ thống báo cáo trực quan hỗ trợ theo dõi đơn hàng, doanh thu, và tình trạng kho.
- Deploy hệ thống lên nền tảng hosting như:(Vercel, Render ,Railway …) để có thể truy cập online.

## Công nghệ sử dụng

| Thành phần | Công nghệ                   |
| ---------- | --------------------------- |
| Frontend   | ReactJS + TailwindCSS       |
| Backend    | Node.js + Express           |
| CSDL       | MySQL (Prisma ORM)          |
| Auth       | JWT (Đăng nhập, xác thực)   |
| Tools      | Postman, VSCode, Git, Figma |

---

## 🗂️ Cấu trúc dự án

```bash
├── client/                # Giao diện người dùng (React)
├── server/                # Server API (Node.js/Express)
│   ├── prisma/            # Schema Prisma và migrations
│   ├── controllers/
│   ├── routes/
│   └── middlewares/
├── database/              # File export cấu trúc CSDL + mẫu dữ liệu
├── README.md              # Tài liệu mô tả hệ thống
├── LICENSE
└── .env
```
