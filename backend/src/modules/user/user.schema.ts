import { object, string} from "zod";

export const RegisterUserSchema = object({
  body: object({
    username: string({
      required_error: "username is required",
    }),
    password: string({
      required_error: "password is required",
    })
      .min(6, "Password must be at least 6 characters long")
      .max(64, "Password should not be longer than 64 characters"),
    confirmPassword: string({
      required_error: "confirmPassword is required",
    }),
  }).refine((data) => {
    return data.password === data.confirmPassword
  }, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export type RegisterUserBody = typeof RegisterUserSchema["_input"]["body"];
