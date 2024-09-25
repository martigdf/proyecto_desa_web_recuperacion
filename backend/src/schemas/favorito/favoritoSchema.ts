import { Static, Type } from "@sinclair/typebox";
import { UsuarioSchema } from "../usuario/UsuarioSchema.js";
import { PropiedadSchema } from "../propiedades/PropiedadSchema.js";

export const FavoritoSchema = Type.Object({
    id: Type.Number(),
    userId: Type.Ref(UsuarioSchema.properties.id),
    propertyId: Type.Ref(PropiedadSchema.properties.id),
}, { additionalProperties: false });

export type FavoriteType = Static<typeof FavoritoSchema>;
