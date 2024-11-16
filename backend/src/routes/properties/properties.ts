import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
// import { query } from '../../services/database.js';
import { 
    PropertyIdSchema, 
    PropertyGetQuerySchema
    // PropertyPostType
} from "../../types/schemas/property/propertySchema.js";
import {query} from "../../services/database.js";

const propertyRoute: FastifyPluginAsync = async (fastify: FastifyInstance, 
    opts: FastifyPluginOptions): Promise<void> => {
    fastify.get('/', {
        schema: {
            description: "Obtener todas las propiedades",
            summary: "Obtener todas las propiedades registradas",
            tags: ['properties'],
            response: {
                200: {
                    description: "Listado de propiedades",
                    type: "array",
                    items: PropertyGetQuerySchema
                },
                404: {
                    description: "No hay propiedades registradas",
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    }
                },
                501: {
                    description: "Not implemented",
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    }
                }
            }
        },
        handler: async function (request, reply) {
            const res = await query(`SELECT
                id,
                title,
                description,
                price,
                location,
                number_of_rooms,
                number_of_bathrooms,
                main_img_url,
                contact_data,
                property_type
                FROM properties`);
            if (res.rows.length === 0) {
                reply.code(404).send({ message: "No hay propiedades registradas" });
                return;
            }
            return res.rows;
        }
    });

    fastify.get('/:id', {
        schema: {
            description: "Obtener una propiedad",
            summary: "Obtener una propiedad por id",
            tags: ['properties'],
            params: PropertyIdSchema,
            response: {
                200: {
                    description: "Propiedad encontrada",
                    type: "object",
                    properties: PropertyGetQuerySchema.properties
                },
                404: {
                    description: "Propiedad no encontrada",
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    }
                },
                501: {
                    description: "Not implemented",
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    }
                }
            }
        },
        handler: async function (request, reply) {
            const { id } = request.params as { id: string };
            const res = await query(`SELECT
                                         id,
                                         title,
                                         description,
                                         price,
                                         location,
                                         number_of_rooms,
                                         number_of_bathrooms,
                                         main_img_url,
                                         contact_data,
                                         property_type
                FROM properties WHERE id = ${id}`);
            if (res.rows.length === 0) {
                reply.code(404).send({ message: "Propiedad no encontrada" });
                return;
            }
            return res.rows[0];
            //reply.status(501).send({ message: "Not implemented" });
        }
    });

    fastify.delete('/:id', {
        schema: {
            description: "Eliminar una propiedad",
            summary: "Eliminar una propiedad por id",
            tags: ['properties'],
            params: PropertyIdSchema,
            response: {
                200: {
                    description: "Propiedad eliminada exitosamente",
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    }
                },
                404: {
                    description: "Propiedad no encontrada o ya eliminada",
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    }
                },
                501: {
                    description: "Not implemented",
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            const { id } = request.params as { id: string };
            const res = await query(`DELETE FROM properties WHERE id = ${id} RETURNING id`);
            
            if (res.rowCount === 0) {
                reply.code(404).send({ message: "Propiedad no encontrada o ya eliminada" });
                return;
            }

            reply.code(200).send({ message: "Propiedad eliminada exitosamente" });
            //reply.status(501).send({ message: "Not implemented" });
        }
    });

    fastify.put('/:id', {
        schema: {
            description: "Actualizar una propiedad",
            summary: "Actualizar una propiedad por id",
            tags: ['properties'],
            body: PropertyGetQuerySchema,
            params: PropertyIdSchema,
            response: {
                200: {
                    description: "Propiedad actualizada exitosamente",
                    type: "object",
                    properties: PropertyGetQuerySchema.properties
                },
                404: {
                    description: "No se pudo actualizar la propiedad",
                    type: "object",
                    properties: {
                        message: {type: "string"}
                    }
                },
                501: {
                    description: "Not implemented",
                    type: "object",
                    properties: {
                        message: {type: "string"}
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            /*const { id } = request.params as { id: string };
            const propiedadUpdate = request.body as PropertyPostType;
            const title = propiedadUpdate.title;
            const description = propiedadUpdate.description;
            const price = propiedadUpdate.price;
            const location = propiedadUpdate.location;
            const area = propiedadUpdate.area;
            const number_rooms = propiedadUpdate.number_rooms;
            const number_bathrooms = propiedadUpdate.number_bathrooms;
            const contact_details = propiedadUpdate.contact_details;

            //Convierte contact_details y location a string para guardarlo en la base de datos
            const contactDetailsString = JSON.stringify(contact_details);
            const locationString = JSON.stringify(location);

            try {
                const res = await query(
                    `UPDATE properties
                    SET title = $1, description = $2, price = $3, location = $4, area = $5, number_rooms = $6, number_bathrooms  = $7, datos_de_contacto = $10
                    WHERE id = $11 RETURNING id;`,
                    [title, description, price, locationString, area, number_rooms, number_bathrooms, contactDetailsString, id]
                );

                if (res.rowCount === 0) {
                    reply.code(404).send({ message: "No se pudo actualizar la propiedad" });
                    return;
                }

                reply.code(200).send({
                    id,
                    title,
                    description,
                    price,
                    location,
                    area,
                    number_rooms,
                    number_bathrooms,
                    contact_details
                });
            } catch (error) {
                console.error('Error al actualizar la propiedad:', error);
                reply.code(500).send({ message: "Error al actualizar la propiedad en la base de datos" });
            }*/
        reply.status(501).send({ message: "Not implemented" });
        }
    });
    
};

export default propertyRoute;