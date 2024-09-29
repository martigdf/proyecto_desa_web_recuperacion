import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { UserSchema } from "../../types/schemas/user/userSchema.js";
import {PropertySchema} from "../../types/schemas/property/propertySchema.js";
import {query} from "../../services/database.js";

const adminRoute: FastifyPluginAsync = async (fastify: FastifyInstance,
    opts: FastifyPluginOptions) : Promise<void> => {
    fastify.get('/users', {
        schema: {
            summary: "Obtener todos los usuarios",
            tags: ['admin'],
            description: "Obtener todos los usuarios registrados",
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: UserSchema.properties
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            const res = await query(`select
                id,
                name,
                lastname,
                email,
                role
                from users`);
            if(res.rows.length === 0) {
                reply.code(404).send({ message: "No hay usuarios registrados" });
                return;
            }
            return res.rows;
        }
    });

    fastify.get('/properties', {
        schema: {
            summary: "Obtener todas las propiedades",
            description: "Obtener todas las propiedades registradas",
            tags: ['admin'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: PropertySchema.properties
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
        /*    const res = await fastify.query(`select
                id,
                title,
                description,
                price,
                location,
                area,
                number_of_rooms,
                number_of_bathrooms,
                contact_details
                from properties`);
            if(res.rows.length === 0) {
                reply.code(404).send({ message: "No hay propiedades registradas" });
                return;
            }
            return res.rows;*/
            reply.status(501).send({ message: "Not implemented" });
        }
    });

    // Para obtener las propiedades
    fastify.get('/data-sources', {
        schema: {
            summary: "Obtener todas las fuentes de datos",
            description: "Obtener todas las fuentes de datos registradas",
            tags: ['admin'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            'name': { type: 'string' },
                            'url': { type: 'string' }
                        }
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            reply.status(501).send({ message: "Not implemented" });
        }
    });
};

export default adminRoute;