import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
//import { query } from '../../services/database.js';
import {
    SearchPostSchema,
    //SearchPostType
} from "../../schemas/search/searchSchema.js";

const criteriosBusquedaRoute: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions
): Promise<void> => {

    // GET /criterios_busqueda
    fastify.get('/', {
        schema: {
            summary: "Obtener todos los criterios de búsqueda",
            description: "Obtener todos los criterios de búsqueda registrados",
            tags: ['search_criteria'],
            response: {
                200: {
                    description: "Listado de criterios de búsqueda",
                    type: "array",
                    items: SearchPostSchema
                },
                404: {
                    description: "No hay criterios de búsqueda registrados",
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
            /*const res = await query(`
                SELECT
                    id,
                    userId,
                    location,
                    price_rangeMin,
                    price_rangeMax,
                    number_rooms,
                    property_type
                FROM search_criteria`);
            
            if (res.rows.length === 0) {
                reply.code(404).send({ message: "No hay criterios de búsqueda registrados" });
                return;
            }

            return res.rows;*/
            reply.status(501).send({ message: "Not implemented" });
        }
    });


    fastify.post('/', {
        schema: {
            summary: "Insertar criterio de búsqueda",
            description: "Insertar un nuevo criterio de búsqueda",
            tags: ['search_criteria'],
            body: SearchPostSchema,
            response: {
                201: {
                    description: "Criterio de búsqueda insertado",
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        userId: { type: "number" },
                        location: { type: "object" },
                        price_rangeMin: { type: "number" },
                        price_rangeMax: { type: "number" },
                        number_rooms: { type: "number" },
                        property_type: { type: "string" }
                    }
                },
                404: {
                    description: "Error al insertar criterio de búsqueda",
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    }
                },
                500: {
                    description: "Error al insertar criterio de búsqueda en la base de datos",
                    type: "object",
                    properties: {
                        message: {type: "string"}
                    }
                }
            }
        },
        handler: async function (request, reply) {
            /*const criterioPost = request.body as SearchPostType;
            const usuarioId = criterioPost.userId;
            const location = criterioPost.location;
            const rangoPreciosMin = criterioPost.price_rangeMin;
            const rangoPreciosMax = criterioPost.price_rangeMax;
            const habitaciones = criterioPost.number_rooms;
            const tipoPropiedad = criterioPost.property_type;

            const locationString = JSON.stringify(location);
            try {
                const res = await query(
                    `INSERT INTO search_criteria
                    (usuarioId, location, rango_precios_min, rango_precios_max, cantidad_de_habitaciones, tipo_de_propiedad)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id;`,
                    [usuarioId, locationString, rangoPreciosMin, rangoPreciosMax, habitaciones, tipoPropiedad]
                );

                if (res.rowCount === 0) {
                    reply.code(404).send({ message: "Error al insertar criterio de búsqueda" });
                    return;
                }

                const id = res.rows[0].id;
                reply.code(201).send({
                    id,
                    usuarioId: usuarioId,
                    location: criterioPost.location,
                    rango_precios_min: rangoPreciosMin,
                    rango_precios_max: rangoPreciosMax,
                    cantidad_de_habitaciones: habitaciones,
                    tipo_de_propiedad: tipoPropiedad
                });
            } catch (error) {
                console.error('Error al insertar criterio de búsqueda:', error);
                reply.code(500).send({ message: "Error al insertar criterio de búsqueda en la base de datos" });
            }*/
            reply.status(501).send({ message: "Not implemented" });
        }
    });
};

export default criteriosBusquedaRoute;