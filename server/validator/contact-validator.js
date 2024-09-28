const { z } = require("zod");

// userSchema

const contactSchema = z.object({

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email Adrress" })
        .min(3, { message: "Email must be of 3 characters" })
        .max(255, "Email must be of max 255 characters"),

    message: z
        .string({ required_error: "Message is required" })
        .min(0, { message: "Message must be of 00 characters" })
        .max(2000, "Message must be of max 1024 characters"),
});


module.exports = { contactSchema }