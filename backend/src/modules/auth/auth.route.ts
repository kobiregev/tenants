import express from "express";
import validate from "../../middleware/validateResource";
import { LoginSchema } from "./auth.schema";
import { loginHandler, logoutHandler } from "./auth.controller";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.post("/", validate(LoginSchema), loginHandler);
router.get("/", requireUser, logoutHandler);

export default router;
