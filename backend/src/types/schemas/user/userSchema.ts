import { Static, Type } from "@sinclair/typebox";

// La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

export const UserSchema = Type.Object({
    id: Type.Number(),
    name: Type.String({ minLength: 2, maxLength: 50 }),
    lastname: Type.String({ minLength: 2, maxLength: 50 }),
    email: Type.String({ type: 'string', format: 'email' }),
    registration_date: Type.String({ format: 'date-time' }),
    role: Type.Union([Type.Literal("admin"), Type.Literal("user")]),
});

export const UserPostSchema = Type.Object({
    name: Type.String(),
    lastname: Type.String(),
    email: Type.String({format: 'email'}),
    password: Type.String({pattern: passwordPattern.source}),
    role:Type.Union([Type.Literal("admin"), Type.Literal("user")]),
});

export const UserPutSchema = Type.Object({
    name: Type.Optional(Type.String()),
    lastname: Type.Optional(Type.String()),
    email: Type.Optional(Type.String({format: 'email'})),
    password: Type.Optional(Type.String({pattern: passwordPattern.source})),
    role: Type.Optional(Type.Union([Type.Literal("admin"), Type.Literal("user")])),
});

export const UserIdSchema = Type.Object({
    id: Type.Number(),
}, { $id: 'UserIdSchema' });

export const UserIdReference = Type.Ref(UserIdSchema);

export type UserIdRef = Static<typeof UserIdReference>;
export type UserIdType = Static<typeof UserIdSchema>;
export type UserType = Static<typeof UserSchema>;
export type UserPostType = Static<typeof UserPostSchema>;
export type UserPutType = Static<typeof UserPostSchema>;