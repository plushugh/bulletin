import express from "express";
import { z } from "zod";
import { authorizeToken } from "../lib/auth";
import prisma from "../prisma";

const router = express.Router();

router.post("/create", authorizeToken, async (req, res) => {
  const user = req.user;

  if (!user) return; // just to get rid of ts warning

  const verifySchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(5000),
  });

  const parseRes = await verifySchema.safeParseAsync(req.body);

  if (!parseRes.success) {
    return res
      .status(400)
      .json({ hasError: true, error: "Title and content invalid" });
  }

  const { data } = parseRes;
  const code = Math.random().toString().slice(2, 10);

  try {
    await prisma.bulletin.create({
      data: {
        code,
        title: data.title,
        content: data.content,
        userId: user.id,
      },
    });
    res.send({ hasError: false, code });
  } catch (_error) {
    res.status(400).json({
      hasError: true,
      error: "Error happend while creating bulletin",
    });
  }
});

router.get("/:code", async (req, res) => {
  const code = req.params.code;

  const verifySchema = z.string().min(8).max(8);

  const parseRes = await verifySchema.safeParseAsync(code);

  if (!parseRes.success) {
    return res.status(400).json({ hasError: true, error: "Invalid code" });
  }

  const { data } = parseRes;

  const bulletin = await prisma.bulletin.findUnique({
    where: { code: data },
    include: {
      user: true,
    },
  });

  if (!bulletin) {
    return res.status(400).json({
      hasError: true,
      error: "Bulletin not found",
    });
  }

  res.json({ hasError: false, bulletin });
});

router.delete("/:code", authorizeToken, async (req, res) => {
  const code = req.params.code;
  const user = req.user;

  if (!user) return; // just to get rid of ts warning

  const verifySchema = z.string().min(8).max(8);

  const parseRes = await verifySchema.safeParseAsync(code);

  if (!parseRes.success) {
    return res.status(400).json({ hasError: true, error: "Invalid code" });
  }

  const { data } = parseRes;

  const existingBulletin = await prisma.bulletin.findUnique({
    where: { code: data },
  });

  if (!existingBulletin) {
    return res.status(400).json({
      hasError: true,
      error: "Bulletin not found",
    });
  }

  if (user.role === "ADMIN" || user.id === existingBulletin.userId) {
    await prisma.bulletin.delete({
      where: { code: data },
    });
    return res.send({ hasError: false });
  }

  return res.status(400).json({
    hasError: true,
    error: "Only the creator or admins can delete the bulletin",
  });
});

export default router;
