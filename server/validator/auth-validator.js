const { z } = require("zod");



// userSchema
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Enter Proper Email Addrss" })
        .min(3, { message: "Email must be of 3 characters" })
        .max(255, "Email must be of max 255 characters"),


    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be of 7 characters" })
        .max(1024, "Password must be of max 1024 characters"),
});


const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be of 3 characters" })
        .max(20, "Name must be of max 10 characters"),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email Adrress" })
        .min(3, { message: "Email must be of 3 characters" })
        .max(255, "Email must be of max 255 characters"),

    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be of 10 characters" })
        .max(20, "Phone must be of max 20 characters"),

    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be of 7 characters" })
        .max(1024, "Password must be of max 1024 characters"),
});




module.exports = { loginSchema, signupSchema }