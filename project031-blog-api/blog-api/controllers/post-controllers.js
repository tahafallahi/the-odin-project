import sanitize from "sanitize-html";
import { prisma } from "../prisma/prisma.js";
import { body, matchedData, validationResult } from "express-validator";

const validatePost = [
  body("title").trim().notEmpty().isLength({ max: 300 }),
  body("text").trim().notEmpty(),
];

export const createPost = [
  validatePost,
  async function (req, res) {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const { title: dirtyTitle, text: dirtyText } = matchedData(req);

      const post = await prisma.post.create({
        data: { title: sanitize(dirtyTitle), text: sanitize(dirtyText) },
      });

      return res.status(201).json(post);
    } else {
      return res.status(400).json(validationErrors);
    }
  },
];

export const getPost = [
  async function (req, res) {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!post) {
      return res
        .status(404)
        .json({ error: "the requested post doesn't exist." });
    }
    if (!post.isPublished) {
      if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "you can't access this." });
      }
    }

    return res.status(200).json(post);
  },
];

export const getAllPosts = [
  async function (req, res) {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (!req.user || req.user.role !== "ADMIN") {
      return res.status(200).json(posts.filter((p) => p.isPublished));
    }

    return res.status(200).json(posts);
  },
];

export const updatePost = [
  async function (req, res) {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!post) {
      return res
        .status(404)
        .json({ error: "the requested post doesn't exist." });
    }

    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: req.body,
    });

    return res.status(200).json(updatedPost);
  },
];

export const deletePost = [
  async function (req, res) {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!post) {
      return res
        .status(404)
        .json({ error: "the requested post doesn't exist." });
    }

    await prisma.post.delete({ where: { id: post.id } });

    return res.status(200).json(post);
  },
];
