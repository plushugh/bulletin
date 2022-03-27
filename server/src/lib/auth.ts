import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

// creates user from username and plaintext password
// also it throws error if user with username exists
// returns generated JWT
export async function signUp(username: string, password: string) {
  // check if the username is already taken
  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (existingUser) {
    throw new Error("Username already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return generateToken(user);
}

// signs in the user w/ username and token
// returns the JWT token
export async function signIn(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid username or password");
  }
  return generateToken(user);
}

// signs out the user by deleting the token
export async function signOut(token: string) {
  // no error should be thrown because the auth middleware checks if the token exists in db
  await prisma.token.delete({ where: { token } });
}

// authorization middleware
// add if auth is required
// terminates request if auth is invalid
// (if the token does not exist in the user's tokens (signed out) or invalid token)
// and sends response codes:
// No Token: 401 + "No token provided"
// Invalid Token: 403 + "Invalid token"
// User not found: 403 + "User not found" *SIGNED OUT*
// Token not found (deleted): 403 + "Token not found"
export async function authorizeToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get token from httponly cookie
  const token = req.cookies?.token;

  if (!token)
    return res
      .status(401)
      .json({ hasError: true, error: "No token provided" });

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, jwtUser: any) => {
      if (err)
        return res.status(403).json({ hasError: true, error: "Invalid token" });

      const user = await prisma.user.findUnique({
        where: { id: jwtUser.userId },
      });
      if (!user)
        return res
          .status(403)
          .json({ hasError: true, error: "User not found" });

      const tokenInDB = await prisma.token.findUnique({ where: { token } });
      if (!tokenInDB)
        return res
          .status(403)
          .json({ hasError: true, error: "Token not found" });

      req.user = user;
      req.token = token;

      next();
    }
  );
}

// generates a token for the user
// also saves it to the user's tokens
export async function generateToken(user: User) {
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
  await prisma.token.create({
    data: {
      token,
      userId: user.id,
    },
  });
  return token;
}
