const {z} = require('zod');

const userSchema = z.object({
    username: z.string()
    .min(3, { message: "Username must be at least 3 characters long" }) // Minimum length of 3
    .max(20, { message: "Username cannot be more than 20 characters long" }) // Maximum length of 20
    .regex(/^[a-z0-9]+$/, { message: "Username can only contain lowercase letters and numbers" }),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be less than 20 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
});

const idSchema = z.string().regex(/^\d+$/, 'El ID debe ser un número');

function validateUser(object) {
    return userSchema.safeParse(object);
}

function validateUserId(id) {
    return idSchema.safeParse(id);
}

module.exports = { validateUser, validateUserId }