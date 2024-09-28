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
            tags: ['search_criteria'],
        },
        onRequest: fastify.authenticate,
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
            reply.notImplemented();
        }
    });


    fastify.post('/', {
        schema: {
            tags: ['search_criteria'],
            body: SearchPostSchema
        },
        onRequest: fastify.authenticate,
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
            reply.notImplemented();
        }
    });
};

export default criteriosBusquedaRoute;