import { object, string, number } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "name is required",
    }).max(64, "Name should not be longer than 64 characters"),
    phoneNumber: string({
      required_error: "phoneNumber is required",
    }),
    address: string({ required_error: "address is required" }),
    financialDebt: number().optional(),
  }),
};
const params = {
  params: object({
    tenantId: string({
      required_error: "tenantId is required",
    }),
  }),
};

// maybe validate a valid israeli phone number
export const CreateTenantSchema = object({ ...payload });
export type CreateTenantBody = typeof CreateTenantSchema._input.body;

export const UpdateTenantSchema = object({ ...payload, ...params });
export type UpdateTenantBody = typeof UpdateTenantSchema._input.body;
export type UpdateTenantParams = typeof UpdateTenantSchema._input.params;

export const DeleteTenantSchema = object({ ...params });
export type DeleteTenantParams = typeof DeleteTenantSchema._input.params;
