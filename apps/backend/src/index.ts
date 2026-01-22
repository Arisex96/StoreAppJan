import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "@repo/db";

const corsOrigin = process.env.FRONTEND_PUBLIC_URL
  ? `https://${process.env.FRONTEND_PUBLIC_URL}`
  : "http://localhost:3000"; // next

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);

/**
 * 
 * model User {
    id        String   @id @default(cuid())
    email     String   @unique
    password  String
    name      String?
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
 */

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.post("/login", express.json(), async (req, res) => {
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error });
  }
});

app.post("/signup", express.json(), async (req, res) => {
  const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
  });
  try {
    const { email, password, name } = RegisterSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
