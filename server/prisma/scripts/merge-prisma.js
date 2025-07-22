const fs = require("fs");
const path = require("path");

const baseSchema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
`;

const modelsDir = path.join(__dirname, "../models");
const outputPath = path.join(__dirname, "../schema.prisma");

const modelFiles = fs
  .readdirSync(modelsDir)
  .filter((file) => file.endsWith(".prisma"));

const modelContent = modelFiles
  .map((file) => fs.readFileSync(path.join(modelsDir, file), "utf8"))
  .join("\n\n");

fs.writeFileSync(outputPath, `${baseSchema}\n\n${modelContent}`);

console.log("✅ Đã gộp các model vào schema.prisma");
