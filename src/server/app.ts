import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";

import { expressLogger, logger } from "./util/logger";

import blog from "./routes/blog";

logger.info("Starting express server...");

const app = express();

// Middleware setup
app.use(expressLogger);
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Use /public as static server
app.use(express.static(path.join(__dirname, "public")));

// Load other routes
app.use("/", blog);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // TODO: Provide the error trace or an error page

  if (process.env.NODE_ENV === "dev") {
    logger.error(err);
  } else {
    logger.error(err);
  }

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error: err, message: err.message, trace: err.stack});
});

export default app;
