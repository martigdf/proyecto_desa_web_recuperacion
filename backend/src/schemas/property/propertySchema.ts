import { Static, Type } from "@sinclair/typebox";

//Ubicación propiedad
export const UbicationSchema = Type.Object({
    address: Type.String({ minLength: 2, maxLength: 100 }),
    city: Type.String({ minLength: 2, maxLength: 50 }),
    country: Type.String({ minLength: 2, maxLength: 50 }),
}, { additionalProperties: false });

//Datos de contacto
const ContactDetailsSchema = Type.Object({
    name: Type.String({ minLength: 2, maxLength: 100 }),
    email: Type.String({ format: 'email' }),
    phone: Type.String({ minLength: 7, maxLength: 15 }),
}, { additionalProperties: false });


export const PropertySchema = Type.Object({
    id: Type.Number(),
    title: Type.String({ minLength: 2, maxLength: 100 }),
    description: Type.Optional(Type.String({ maxLength: 500 })),
    price: Type.Number({ minimum: 0 }),
    location: UbicationSchema,
    area: Type.Optional(Type.Number({ minimum: 0, maximum: 1000 })),
    number_rooms: Type.Number({ minimum: 1, maximum: 10 }),
    number_bathrooms: Type.Number({ minimum: 1, maximum: 10 }),
    publication_date: Type.String({ format: 'date-time' }),
    //image: Type.Optional(Type.String({  })),
    contact_details: ContactDetailsSchema,
}, { additionalProperties: false });

export type PropertyType = Static<typeof PropertySchema>;
