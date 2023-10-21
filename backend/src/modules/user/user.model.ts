import argon2 from "argon2";
import mongoose, { Schema,Document } from "mongoose";

export interface UserInput{
  username:string;
  password:string;
}

export interface User extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true,unique:true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  // pre create user or modify hash password
  if (this.isModified("password") || this.isNew) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  }
});

// method for comparing passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as User;
  return await argon2.verify(user.password, candidatePassword);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
