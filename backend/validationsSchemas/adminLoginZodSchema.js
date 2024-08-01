import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(255, "Name must be at most 255 characters").min(1, "Name is required"),
    password: z.string().min(3, "Password must be at least 3 characters").max(255, "Password must be at most 255 characters").min(1, "Password is required"),
});

export default userSchema;
