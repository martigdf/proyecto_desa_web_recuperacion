import { Static, Type } from "@sinclair/typebox";

export const nameSchema = Type.Object(
    {
        type: Type.Literal("field"),
        fieldname: Type.String(),
        mimetype: Type.String(),
        encoding: Type.String(),
        value: Type.String(),
        fieldnameTruncated: Type.Boolean(),
        valueTruncated: Type.Boolean(),
    },
    { additionalProperties: false }
);

const emailSchema = Type.Object(
    {
        type: Type.Literal("field"),
        fieldname: Type.String(),
        mimetype: Type.String(),
        encoding: Type.String(),
        value: Type.String(),
        fieldnameTruncated: Type.Boolean(),
        valueTruncated: Type.Boolean(),
    },
    { additionalProperties: false },
);

export const UsuarioSchema = Type.Object({
    id: Type.Number(),
    name: Type.String({ minLength: 2, maxLength: 50 }),
    lastname: Type.String({ minLength: 2, maxLength: 50 }),
    email: Type.String({ type: 'string', format: 'email' }),
    registration_date: Type.String({ format: 'date-time' }),
    role: Type.Union([Type.Literal("admin"), Type.Literal("user")]),
}, { additionalProperties: false });

export const UsuarioPostSchema = Type.Object({
    name: nameSchema,
    lastname: nameSchema,
    email: emailSchema,
    password: nameSchema,
    registration_date:Type.String({ format: 'date-time' }),
    role:Type.Union([Type.Literal("admin"), Type.Literal("user")]),
});

export const UsuarioPutSchema = Type.Object({
    name: Type.Optional(nameSchema),
    lastname: Type.Optional(nameSchema),
    email: Type.Optional(nameSchema),
    password: Type.Optional(nameSchema),
    registration_date: Type.Optional(Type.String({ format: 'date-time' })),
    role: Type.Optional(Type.Union([Type.Literal("admin"), Type.Literal("user")])),
});

export const UsuarioIdSchema = Type.Object({
    id: Type.Number(),
});

export type PersonaIdType = Static<typeof UsuarioIdSchema>;
export type UsuarioType = Static<typeof UsuarioSchema>;
export type PersonaPostType = Static<typeof UsuarioPostSchema>;
export type PersonaPutType = Static<typeof UsuarioPutSchema>;
export type NameSchemaType = Static<typeof nameSchema>;