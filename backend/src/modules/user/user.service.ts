import UserModel, { User, UserInput } from "./user.model";

export async function createUser(user: UserInput) {
  return UserModel.create(user);
}

export async function findUserByUsername(username: User["username"]) {
  return UserModel.findOne({ username });
}
