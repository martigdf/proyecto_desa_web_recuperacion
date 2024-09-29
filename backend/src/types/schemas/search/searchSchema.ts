import { Static, Type } from "@sinclair/typebox";
import { UserIdReference } from "../user/userSchema.js";

const PropertyTypeEnum = Type.Union([
    Type.Literal("apartmento"),
    Type.Literal("casa"),
]);

export const UbicacionCriteriosSchema = Type.Object({
    city: Type.String({minLength: 2, maxLength: 50}),
    country: Type.String({minLength: 2, maxLength: 50}),
});

export const SearchSchema = Type.Object({
    id: Type.Number(),
    // userId es un número que hace referencia a un usuario
    userId: UserIdReference,
    location: UbicacionCriteriosSchema,
    price_rangeMin: Type.Number({ minimum: 0 }),
    price_rangeMax: Type.Number({ minimum: 0 }),
    number_rooms: Type.Number({ minimum: 1, maximum: 10 }),
    property_type: PropertyTypeEnum,
});

export const SearchPostSchema = Type.Object({
    location: UbicacionCriteriosSchema,
    price_rangeMin: Type.Number({ minimum: 0 }),
    price_rangeMax: Type.Number({ minimum: 0 }),
    number_rooms: Type.Number({ minimum: 1, maximum: 10 }),
    property_type: PropertyTypeEnum,
});

export type CriteriosDeBusquedaType = Static<typeof UbicacionCriteriosSchema>;
export type SearchPostType = Static<typeof SearchPostSchema>;