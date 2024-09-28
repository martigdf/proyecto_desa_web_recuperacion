import { Static, Type } from "@sinclair/typebox";
import { UserSchema } from "../user/userSchema.js"
import { PropertySchema } from "../properties/propertySchema.js";

export const FavoriteSchema = Type.Object({
    id: Type.Number(),
    userId: Type.Ref(UserSchema.properties.id),
    propertyId: Type.Ref(PropertySchema.properties.id),
}, { additionalProperties: false });

export type FavoriteType = Static<typeof FavoriteSchema>;
