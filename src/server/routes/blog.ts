/**
 * Blog test route
 */

import * as express from "express";
import * as path from "path";

const router = express.Router();

router.get("/blog", (req, res, next) => {
  res.send({hello: "world"});
});

export default router;
