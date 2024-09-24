import { Static, Type } from "@sinclair/typebox";


export const PropiedadSchema = Type.Object({
    id: Type.Number(),
    title: Type.String({ minLength: 2, maxLength: 100 }),
    description: Type.Optional(Type.String()),
    price: Type.Number({ minimum: 0 }),
    location: Type.String({ minLength: 2, maxLength: 100 }),
    area: Type.Optional(Type.Number({ minimum: 0, maximum: 1000})),
    number_rooms: Type.Optional(Type.Number({ minimum: 0, maximum: 10 })),
    number_bathrooms: Type.Optional(Type.Number({ minimum: 0, maximum: 10})),
    publication_date: Type.String({ format: 'date-time' }),
    //image: Type.Optional(Type.String({  })),
    contact_details: Type.Optional(Type.String({ maxLength: 255 })),
}, { additionalProperties: false });

export type PropertyType = Static<typeof PropiedadSchema>;
