import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { logger } from "./lib/logger.js";
import bankingRouter from "./routes/banking.js";

const app = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

// Banking routes
app.use("/api", bankingRouter);

const port = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  logger.info({ port }, "Server listening");
});
