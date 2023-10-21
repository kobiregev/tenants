import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TenantModel, { Tenant, TenantInput } from "./tenant.model";

export async function createTenant(tenant: TenantInput) {
  return TenantModel.create(tenant);
}

export async function getTenants() {
  return TenantModel.find();
}

export async function findTenant(_id: Tenant["_id"]) {
  return TenantModel.findOne({ _id });
}

export async function findAndUpdateTenant(
  query: FilterQuery<Tenant>,
  update: UpdateQuery<Tenant>,
  options: QueryOptions
) {
  return TenantModel.findOneAndUpdate(query, update, options);
}

export async function deleteTenant(query: FilterQuery<Tenant>) {
  return TenantModel.deleteOne(query);
}
