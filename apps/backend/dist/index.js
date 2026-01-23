"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const db_1 = require("@repo/db");
const corsOrigin = process.env.FRONTEND_PUBLIC_URL
    ? `https://${process.env.FRONTEND_PUBLIC_URL}`
    : "http://localhost:3000"; // next
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
const app = (0, express_1.default)();
// Enable CORS
app.use((0, cors_1.default)({
    origin: corsOrigin,
    credentials: true,
}));
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
app.get("/get-user-list", async (req, res) => {
    try {
        const users = await db_1.prisma.user.findMany({});
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch user list" });
    }
});
app.get("/", (req, res) => {
    res.json({
        message: "hello world",
    });
});
app.post("/login", express_1.default.json(), async (req, res) => {
    const LoginSchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    });
    try {
        const { email, password } = LoginSchema.parse(req.body);
        const user = await db_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret, { expiresIn: "1h" });
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ message: "Invalid request", error });
    }
});
app.post("/signup", express_1.default.json(), async (req, res) => {
    const RegisterSchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        name: zod_1.z.string().optional(),
    });
    try {
        const { email, password, name } = RegisterSchema.parse(req.body);
        const existingUser = await db_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await db_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        res
            .status(201)
            .json({ message: "User registered successfully", userId: newUser.id });
    }
    catch (error) {
        res.status(400).json({ message: "Invalid request", error });
    }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
