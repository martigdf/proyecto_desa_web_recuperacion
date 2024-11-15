use proyecto;
db.createCollection("properties", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "description", "price", "surface_area", "location", "number_of_rooms", "number_of_bathrooms", "publication_date", "main_img_url", "contact_data"],
            properties: {
                title: {
                    bsonType: "string",
                    description: "debe ser una cadena y es obligatorio"
                },
                description: {
                    bsonType: "string",
                    description: "debe ser una cadena y es obligatorio"
                },
                price: {
                    bsonType: "double",
                    description: "debe ser un número y es obligatorio"
                },
                surface_area: {
                    bsonType: "double",
                    description: "debe ser un número y es obligatorio"
                },
                location: {
                    bsonType: "string",
                    description: "debe ser una cadena y es obligatorio"
                },
                number_of_rooms: {
                    bsonType: "int",
                    description: "debe ser un número entero y es obligatorio"
                },
                number_of_bathrooms: {
                    bsonType: "int",
                    description: "debe ser un número entero y es obligatorio"
                },
                publication_date: {
                    bsonType: "date",
                    description: "debe ser una fecha y es obligatorio"
                },
                main_img_url: {
                    bsonType: "string",
                    description: "debe ser una cadena y es obligatorio"
                },
                contact_data: {
                    bsonType: "string",
                    description: "debe ser una cadena y es obligatorio"
                },
                property_type: {
                    bsonType: "string",
                    description: "debe ser una cadena"
                }
            }
        }
    }
});