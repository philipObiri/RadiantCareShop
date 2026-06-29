import path from "node:path";
import { config as dotenv } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma CLI doesn't auto-load .env.local — load it explicitly
dotenv({ path: path.resolve(process.cwd(), ".env.local"), override: false });

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
