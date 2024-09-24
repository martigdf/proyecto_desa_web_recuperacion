import { Static, Type } from "@sinclair/typebox";
import { UsuarioSchema } from "../usuario/UsuarioSchema.js";


const PropertyTypeEnum = Type.Union([
    Type.Literal("apartmento"),
    Type.Literal("casa"),
]);

export const Criterios_busquedaSchema = Type.Object({
    id: Type.Number(),
    userId: Type.Ref(UsuarioSchema.properties.id),
    location: Type.String({ minLength: 2, maxLength: 100 }),
    price_rangeMin: Type.Optional(Type.Number({ minimum: 0 })),
    price_rangeMax: Type.Optional(Type.Number({ minimum: 0 })),
    number_rooms: Type.Optional(Type.Number({ minimum: 1, maximum: 10 })),
    property_type: Type.Optional(PropertyTypeEnum),
}, { additionalProperties: false });

export type CriteriosDeBusquedaType = Static<typeof Criterios_busquedaSchema>;
