import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth";
import bulletinRouter from "./routes/bulletin";
env.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/bulletin", bulletinRouter);

app.listen(3000, () => {
  console.log("[express] Server started on port 3000");
});
