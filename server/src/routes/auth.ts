import dayjs from "dayjs";
import express from "express";
import z from "zod";
import { authorizeToken, signIn, signOut, signUp } from "../lib/auth";

const router = express.Router();

router.post("/create", async (req, res) => {
  const verifySchema = z.object({
    username: z
      .string()
      .min(1)
      .max(30)
      // alphanum lowercase
      .regex(/^[a-z0-9]+$/),
    // at least 8 characters
    // must contain at least 1 uppercase letter
    // 1 lowercase letter, and 1 number
    // Can contain special characters
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  });

  const parseRes = await verifySchema.safeParseAsync(req.body);

  if (!parseRes.success) {
    return res
      .status(400)
      .json({ hasError: true, error: "Username and password invalid" });
  }

  const { data } = parseRes;

  try {
    const jwt = await signUp(data.username, data.password);
    res.cookie("token", jwt, {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      expires: dayjs().add(7, "day").toDate(),
    });
    res.send({ hasError: false });
  } catch (_error) {
    res.status(400).json({
      hasError: true,
      error: "An error happened while signing up",
    });
  }
});

router.post("/signin", async (req, res) => {
  const verifySchema = z.object({
    username: z.string().min(1).max(30),
    password: z.string().min(1),
  });

  const parseRes = await verifySchema.safeParseAsync(req.body);

  if (!parseRes.success) {
    return res
      .status(400)
      .json({ hasError: true, error: "Username and password invalid" });
  }

  const { data } = parseRes;

  try {
    const jwt = await signIn(data.username, data.password);
    res.cookie("token", jwt, {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      expires: dayjs().add(7, "day").toDate(),
    });
    res.send({ hasError: false });
  } catch (_error) {
    res.status(400).json({
      hasError: true,
      error: "Error haopnd while signing in",
    });
  }
});

router.post("/signout", authorizeToken, async (req, res) => {
  const { token } = req;

  if (!token) return; // just to get rid of ts warning

  await signOut(token);

  res.json({ hasError: false });
});

router.get("/echo", authorizeToken, (req, res) => {
  res.send("PROTECTED");
});

export default router;
