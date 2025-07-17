## Xác thực & Bảo mật

bcryptjs -------- Băm (hash) mật khẩu người dùng để lưu an toàn vào DB.
jsonwebtoken ---- Tạo và xác minh JWT token (dùng cho đăng nhập, phân quyền).
helmet ---------- Bảo vệ app Express khỏi các lỗ hổng bảo mật HTTP headers.
cookie-parser --- Phân tích cookies từ request, dùng cho xác thực phiên, JWT

## HTTP, Middleware, API

express --------- Framework server chính, giúp xử lý routes, middleware,...
cors ------------ Cho phép giao tiếp giữa frontend và backend khác origin (CORS policy).
compression ----- Nén HTTP responses để tăng tốc độ tải (gzip).
morgan ---------- Log các request HTTP – tiện để debug.
dotenv ---------- Đọc file .env để cấu hình biến môi trường (PORT, DB_URL, SECRET,...).

## Upload & Media

multer ---------- Middleware để xử lý upload file (hình ảnh, PDF,...).
cloudinary ------ Tích hợp với Cloudinary để upload ảnh/video lên cloud.

## Tiện ích khác

mysql2 ---------- Kết nối và truy vấn CSDL MySQL (hỗ trợ Promises).
resend ---------- Gửi email qua dịch vụ resend.com (giống như SendGrid, Mailgun).
nodemon --------- Tự động restart server khi bạn thay đổi code (chỉ dùng trong dev).
