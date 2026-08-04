import { prisma } from "../prisma/prisma.js";
import { body, matchedData, validationResult } from "express-validator";

const validateComment = [
  body("text").trim().notEmpty().isLength({ max: 10000 }),
  body("postId").trim().notEmpty().toInt(),
];

export const createComment = [
  validateComment,
  async function (req, res) {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const { text, postId } = matchedData(req);
      const comment = await prisma.comment.create({
        data: { text, postId, userId: req.user.id },
        include: { user: { select: { displayName: true } } },
      });

      return res.status(201).json(comment);
    } else {
      return res.status(400).json(validationErrors);
    }
  },
];

export const getComment = [
  async function (req, res) {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!comment) {
      return res
        .status(404)
        .json({ error: "the requested comment doesn't exist." });
    }

    return res.status(200).json(comment);
  },
];

export const getAllComments = [
  async function (req, res) {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(req.query.postId) },
      include: { user: { select: { displayName: true } } },
    });

    return res.status(200).json(comments);
  },
];

export const updateComment = [
  body("text").trim().notEmpty().isLength({ max: 10000 }),
  async function (req, res) {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(req.params.id) },
    });

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors);
    }

    if (!comment) {
      return res
        .status(404)
        .json({ error: "the requested comment doesn't exist." });
    }

    if (comment.userId !== req.user.id && req.user.role != "ADMIN") {
      return res.status(403).json({ error: "you can't update this comment." });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: comment.id },
      data: matchedData(req),
    });

    return res.status(200).json(updatedComment);
  },
];

export const deleteComment = [
  async function (req, res) {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!comment) {
      return res
        .status(404)
        .json({ error: "the requested comment doesn't exist." });
    }

    if (comment.userId != req.user.id && req.user.role != "ADMIN") {
      return res.status(403).json({ error: "you can't update this comment." });
    }

    await prisma.comment.delete({ where: { id: comment.id } });

    return res.status(200).json(comment);
  },
];
