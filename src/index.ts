import express from "express";
import config from "./config";
import routers from "./routes/index.routes";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { requestLogger } from "./middlewares/logger";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many requests",
});

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(routers);
app.use(limiter);

// const allowedOrigins = ["https://www.test.com"];
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || !allowedOrigins.includes(origin)) {
//         callback(null, origin);
//       } else {
//         callback(new Error("Not allowed"));
//       }
//     },
//   })
// );
/**
 * Base route goes here
 */
app.get("/", (req, res) => {
  res.send("TODO CRUD");
});

/** *
 * start the server
 */
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
