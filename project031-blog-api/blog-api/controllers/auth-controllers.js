import jwt from "jsonwebtoken";
import { body, matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { prisma } from "../prisma/prisma.js";

const validateUser = [
  body("displayName").trim().notEmpty().isLength({ max: 50 }),
  body("email").trim().notEmpty().isLength({ max: 100 }),
  body("password").trim().notEmpty().isLength({ min: 8 }),
];

export const registerUser = [
  validateUser,
  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    }

    const { displayName, email, password } = matchedData(req);
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { displayName, email, hashedPassword, role: "USER" },
    });
    return res.status(201).json({
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      role: user.role,
    });
  },
];

export async function loginUser(req, res) {
  const token = jwt.sign(
    {
      sub: req.user.id,
      name: req.user.displayName,
      role: req.user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  const data = jwt.decode(token);
  res.status(200).json({
    token,
    ...data,
  });
}
