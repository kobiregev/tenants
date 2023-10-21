import express from "express";
import { registerUserHandler } from "./user.controller";
import validate from "../../middleware/validateResource";
import { RegisterUserSchema } from "./user.schema";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.get("/", requireUser, (req, res) => {
    return res.send(res.locals.user);
  });
  

router.post("/", validate(RegisterUserSchema), registerUserHandler);

export default router;
