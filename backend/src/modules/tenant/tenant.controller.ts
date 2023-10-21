import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  CreateTenantBody,
  DeleteTenantParams,
  UpdateTenantBody,
  UpdateTenantParams,
} from "./tenant.schema";
import {
  createTenant,
  deleteTenant,
  findAndUpdateTenant,
  findTenant,
  getTenants,
} from "./tenant.service";

export async function createTenantHandler(
  req: Request<{}, {}, CreateTenantBody>,
  res: Response
) {
  const { name, address, phoneNumber, financialDebt } = req.body;
  try {
    const tenant = await createTenant({
      name,
      address,
      phoneNumber,
      financialDebt,
    });
    return res.status(StatusCodes.CREATED).send(tenant);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function getTenantsHandler(req: Request, res: Response) {
  try {
    const tenants = await getTenants();
    return res.status(StatusCodes.OK).send(tenants);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function updateTenantHandler(
  req: Request<UpdateTenantParams, {}, UpdateTenantBody>,
  res: Response
) {
  try {
    const { tenantId } = req.params;
    const update = req.body;

    const tenant = await findTenant(tenantId);
    if (!tenant) {
      return res.status(StatusCodes.NOT_FOUND).send("Tenant not found");
    }
    // const tenant = await findTenant
    const updatedTenant = await findAndUpdateTenant({ _id: tenantId }, update, {
      new: true,
    });
    return res.send(updatedTenant);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function deleteTenantHandler(
  req: Request<DeleteTenantParams>,
  res: Response
) {
  const { tenantId } = req.params;
  try {
    const tenant = await findTenant(tenantId);
    if (!tenant) {
      return res.status(StatusCodes.NOT_FOUND).send("Tenant not found");
    }

    await deleteTenant({ _id: tenantId });

    return res.sendStatus(StatusCodes.OK);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
