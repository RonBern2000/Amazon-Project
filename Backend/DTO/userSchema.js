import {z} from "zod";

export const userSchema = z.object({
    name: 
        z.string()
        .min(3, "Name is required and must be above 3 characters long"),
    email: 
        z.string()
        .email("Invalid email address"),
    password: 
        z.string()
        .min(4, 'Password must be at least 4 characters long')
});