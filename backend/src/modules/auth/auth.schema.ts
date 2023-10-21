import { object, string } from "zod";

export const LoginSchema = object({
  body: object({
    username: string({
      required_error: "username is required",
    }),
    password: string({
      required_error: "password is required",
    })
      .min(6, "password must be at least 6 characters")
      .max(64, "password must not be longer thant 64 characters"),
  }),
});

export type LoginSchemaBody = (typeof LoginSchema)["_input"]["body"];
