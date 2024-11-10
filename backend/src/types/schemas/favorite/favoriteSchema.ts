import { Static, Type } from "@sinclair/typebox";

export const FavoriteSchema = Type.Object({
    id: Type.Number(),
    userId:Type.Number(),
    propertyId: Type.Number(),
})

export const FavoritePostSchema = Type.Object({
    userId: Type.Number(),
    propertyId: Type.Number(),
})

export const FavoriteIdSchema = Type.Object({
    id_favorite: Type.Number()
})

export type FavoriteType = Static<typeof FavoriteSchema>;
export type FavoritePostType = Static<typeof FavoritePostSchema>;
export type FavoriteIdType = Static<typeof FavoriteIdSchema>;