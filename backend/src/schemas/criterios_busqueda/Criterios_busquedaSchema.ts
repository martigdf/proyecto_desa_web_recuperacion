import { Static, Type } from "@sinclair/typebox";
import { UsuarioSchema } from "../usuario/UsuarioSchema.js";

export const Criterios_busquedaSchema = Type.Object({
    id: Type.Number(),
    userId: Type.Ref(UsuarioSchema.properties.id),
    location: Type.String({ minLength: 2, maxLength: 100 }),
    price_rangeMin: Type.Optional(Type.Number({ minimum: 0 })),
    price_rangeMax: Type.Optional(Type.Number({ minimum: 0 })),
    number_rooms: Type.Optional(Type.Number({ minimum: 0 })),
    property_type: Type.Optional(Type.String({ minLength: 2, maxLength: 50 })),
}, { additionalProperties: false });

export type CriteriosDeBusquedaType = Static<typeof Criterios_busquedaSchema>;
