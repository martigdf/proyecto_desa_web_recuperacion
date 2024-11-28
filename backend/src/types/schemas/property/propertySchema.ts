import { Static, Type } from "@sinclair/typebox";

//Ubicación propiedad
export const UbicationSchema = Type.Object({
    address: Type.Optional(Type.String({ minLength: 2, maxLength: 100 })),
    city: Type.Optional(Type.String({ minLength: 2, maxLength: 50 })),
    country: Type.Optional( Type.String({ minLength: 2, maxLength: 50 })),
});

//Datos de contacto
const ContactDetailsSchema = Type.Object({
    name: Type.String({ minLength: 2, maxLength: 100 }),
    email: Type.String({ format: 'email' }),
    phone: Type.String({ minLength: 7, maxLength: 15 }),
});


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
});



export const PropertyIdSchema = Type.Object({
    id: Type.Number(),
}, { $id: 'PropertyIdSchema' });

export const PropertyPostSchema = Type.Object({
    title: Type.String(),
    description: Type.String(),
    price: Type.Number({ minimum: 0 }),
    location: Type.String(),
    area: Type.Number({ minimum: 0, maximum: 1000 }),
    number_rooms: Type.Number({ minimum: 1, maximum: 10 }),
    number_bathrooms: Type.Number({ minimum: 1, maximum: 10 }),
    contact_details: Type.String(),
});

export const PropertyGetQuerySchema = Type.Object({
    id: Type.Optional(Type.Number()),
    title: Type.Optional(Type.String({ minLength: 2, maxLength: 100 })),
    description: Type.Optional(Type.String({ maxLength: 500 })),
    price: Type.Optional(Type.Number({ minimum: 0 })),
    departamento: Type.Optional(Type.String({ minLength: 2, maxLength: 100 })),
    barrio: Type.Optional(Type.String({ minLength: 2, maxLength: 100 })),
    number_of_rooms: Type.Optional(Type.Number({ minimum: 1, maximum: 10 })),
    number_of_bathrooms: Type.Optional(Type.Number({ minimum: 1, maximum: 10 })),
    publication_date: Type.Optional(Type.String({ format: 'date-time' })),
    contact_data: Type.Optional(Type.String()),
    main_img_url: Type.Optional(Type.String()),
});

export const PropertyIdReference = Type.Ref(PropertyIdSchema);

export type PropertyIdRef = Static<typeof PropertyIdReference>;
export type PropertyType = Static<typeof PropertySchema>;
export type PropertyPostType = Static<typeof PropertyPostSchema>;
export type PropertyGetQueryType = Static<typeof PropertyGetQuerySchema>;

