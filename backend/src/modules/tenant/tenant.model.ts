import mongoose, { Document, Schema } from "mongoose";

// TODO: think about making tenant phoneNumber as phone,maybe validate israeli phone, and consider making phone unique
export interface TenantInput {
  name: string;
  phoneNumber: string;
  address: string;
  financialDebt?: number;
}

export interface Tenant extends TenantInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const tenantSchema = new Schema<Tenant>(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    financialDebt: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const TenantModel = mongoose.model("Tenant", tenantSchema);
export default TenantModel;
