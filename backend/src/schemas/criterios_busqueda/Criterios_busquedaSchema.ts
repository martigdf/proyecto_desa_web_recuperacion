import { Static, Type } from "@sinclair/typebox";
import { UsuarioSchema } from "../usuario/UsuarioSchema.js";

const PropertyTypeEnum = Type.Union([
    Type.Literal("apartmento"),
    Type.Literal("casa"),
]);

//Ubicación criterios de busqueda
export const UbicacionCriteriosSchema = Type.Object({
    city: Type.String({ minLength: 2, maxLength: 50 }),
    country: Type.String({ minLength: 2, maxLength: 50 }),
}, { additionalProperties: false });

export const Criterios_busquedaSchema = Type.Object({
    id: Type.Number(),
    userId: Type.Ref(UsuarioSchema.properties.id),
    location: UbicacionCriteriosSchema,
    price_rangeMin: Type.Number({ minimum: 0 }),
    price_rangeMax: Type.Number({ minimum: 0 }),
    number_rooms: Type.Number({ minimum: 1, maximum: 10 }),
    property_type: PropertyTypeEnum,
}, { additionalProperties: false });

export type CriteriosDeBusquedaType = Static<typeof Criterios_busquedaSchema>;
