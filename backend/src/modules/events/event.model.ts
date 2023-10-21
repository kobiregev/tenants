import mongoose, { Schema } from "mongoose";

export enum EventEnum {
  SignIn = "user sign-in",
  SignOut = "user sign-out",
}

export interface EventLog extends Document {
  user: mongoose.Types.ObjectId; // Reference to the User model
  event: EventEnum;
  timestamp: Date;
}

const eventLogSchema = new Schema<EventLog>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: String, enum: Object.values(EventEnum), required: true },
  timestamp: { type: Date, default: Date.now },
});

const EventLogModel = mongoose.model<EventLog>("EventLog", eventLogSchema);

export default EventLogModel;
