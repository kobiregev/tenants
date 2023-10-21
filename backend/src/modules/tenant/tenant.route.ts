import express from "express";
import requireUser from "../../middleware/requireUser";
import validate from "../../middleware/validateResource";
import {
  CreateTenantSchema,
  DeleteTenantSchema,
  UpdateTenantSchema,
} from "./tenant.schema";
import {
  createTenantHandler,
  deleteTenantHandler,
  getTenantsHandler,
  updateTenantHandler,
} from "./tenant.controller";

const router = express.Router();

router.get("/", requireUser, getTenantsHandler);

router.post(
  "/",
  [requireUser, validate(CreateTenantSchema)],
  createTenantHandler
);

router.put(
  "/:tenantId",
  [requireUser, validate(UpdateTenantSchema)],
  updateTenantHandler
);

router.delete(
  "/:tenantId",
  [requireUser, validate(DeleteTenantSchema)],
  deleteTenantHandler
);

export default router;
