import { Static, Type } from "@sinclair/typebox";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const UsuarioSchema = Type.Object({
    id: Type.Number(),
    name: Type.String({ minLength: 2, maxLength: 50 }),
    lastname: Type.String({ minLength: 2, maxLength: 50 }),
    email: Type.String({ format: 'email', pattern: emailRegex.source }),
    registration_date: Type.String({ format: 'date-time' }),
    role: Type.Union([Type.Literal("admin"), Type.Literal("user")]),
}, { additionalProperties: false });

export type UsuarioType = Static<typeof UsuarioSchema>;
