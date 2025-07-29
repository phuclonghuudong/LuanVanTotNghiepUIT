const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const errorMain = require("./v1/utils/errorMain");

const app = express();
const PORT = 2410;
app.use(express.json());

app.use(
  cors({
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    origin: process.env.FRONTEND_URL,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(compression());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// const { PrismaClient } = require("@prisma/client");
// const { withOptimize } = require("@prisma/extension-optimize");

// const prisma = new PrismaClient().$extends(
//   withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY })
// );

const mainRouter = require("./v1/routers");
app.use("/", mainRouter);

app.get("/", (req, res) => {
  res.send("Hello Hacker!");
});

app.use(errorMain);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
