import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("Email must be a valid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").max(255, "Password must be at most 255 characters").min(1, "Password is required"),
  name: z.string().min(3, "Name must be at least 3 characters").max(255, "Name must be at most 255 characters").min(1, "Name is required"),
  terms: z.boolean().refine(value => value === true, { message: "Terms must be accepted" })
});

export default userSchema;
