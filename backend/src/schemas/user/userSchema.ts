import { Static, Type } from "@sinclair/typebox";

export const FieldSchema = Type.Object(
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

export const UserSchema = Type.Object({
    id: Type.Number(),
    name: Type.String({ minLength: 2, maxLength: 50 }),
    lastname: Type.String({ minLength: 2, maxLength: 50 }),
    email: Type.String({ type: 'string', format: 'email' }),
    registration_date: Type.String({ format: 'date-time' }),
    role: Type.Union([Type.Literal("admin"), Type.Literal("user")]),
}, { additionalProperties: false });

export const UserPostSchema = Type.Object({
    name: FieldSchema,
    lastname: FieldSchema,
    email: FieldSchema,
    password: FieldSchema,
    role:Type.Union([Type.Literal("admin"), Type.Literal("user")]),
});

export const UserPutSchema = Type.Object({
    name: Type.Optional(FieldSchema),
    lastname: Type.Optional(FieldSchema),
    email: Type.Optional(FieldSchema),
    password: Type.Optional(FieldSchema),
    role: Type.Optional(Type.Union([Type.Literal("admin"), Type.Literal("user")])),
});

export const UserIdSchema = Type.Object({
    id: Type.Number(),
});

export type UserIdType = Static<typeof UserIdSchema>;
export type UserType = Static<typeof UserSchema>;
export type UserPostType = Static<typeof UserPostSchema>;
export type UserPutType = Static<typeof UserPostSchema>;
export type FieldSchemaType = Static<typeof FieldSchema>;