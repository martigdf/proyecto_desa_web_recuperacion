import { Static, Type } from "@sinclair/typebox";

export const FavoriteSchema = Type.Object({
    id_favorite: Type.Number(),
    user_id:Type.Number(),
    property_id: Type.Number(),
})

export const FavoritePostSchema = Type.Object({
    user_id: Type.Number(),
    property_id: Type.Number(),
})

export const FavoriteIdSchema = Type.Object({
    id_favorite: Type.Number()
})

export type FavoriteType = Static<typeof FavoriteSchema>;
export type FavoritePostType = Static<typeof FavoritePostSchema>;
export type FavoriteIdType = Static<typeof FavoriteIdSchema>;