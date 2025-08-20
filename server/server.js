// ===== BẮT LỖI TOÀN CỤC =====
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION!", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION!", err);
});

// ===== CÁC IMPORT =====
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const errorHandler = require("./v1/middlewares/errorHandler");

const { PORT, SERVER_URL, FRONTEND_URL } = require("./v1/configs/configENV");

// ===== KHỞI TẠO APP =====
const app = express();
const port = PORT;
const url = SERVER_URL;

// ===== MIDDLEWARE =====
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(compression());
app.use(
  cors({
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    origin: FRONTEND_URL.split(","),
  })
);
app.use(morgan("combined"));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// ===== ROUTES =====
app.get("/", (req, res) => {
  res.send("Server Shop MOLXIPI.");
});

const mainRouter = require("./v1/routes");
const responseHandler = require("./v1/utils/responseHandler");
app.use("/", mainRouter);

// ===== Middleware xử lý lỗi cuối cùng =====
app.use(errorHandler);

// ===== START SERVER =====
app.listen(port, () => {
  console.log(`Server is running at ${url}${port}`);
});

app.use((req, res) => {
  responseHandler(res, 400, "FAIL");
});
