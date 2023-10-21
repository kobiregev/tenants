import { User } from "../user/user.model";
import EventLogModel, { EventEnum } from "./event.model";

export function createEventLog(user: User, eventType: EventEnum) {
  return EventLogModel.create({ user: user._id, event: eventType });
}
