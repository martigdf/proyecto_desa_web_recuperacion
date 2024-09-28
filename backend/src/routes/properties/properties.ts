import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
// import { query } from '../../services/database.js';
import { 
    PropertyIdSchema, 
    // PropertyPostSchema,
    // PropertyPostType
} from "../../schemas/property/propertySchema.js";

const propertyRoute: FastifyPluginAsync = async (fastify: FastifyInstance, 
    opts: FastifyPluginOptions): Promise<void> => {
    fastify.get('/', {
        schema: {
            tags: ['properties'],
        },
        onRequest: fastify.authenticate,
        handler: async function (request, reply) {
            /* const res = await query(`SELECT
                id,
                title,
                description,
                price,
                location,
                area,
                number_of_rooms,
                number_of_bathrooms,
                contact_details
                FROM properties`);
            if (res.rows.length === 0) {
                reply.code(404).send({ message: "No hay propiedades registradas" });
                return;
            }
            return res.rows;*/
            reply.notImplemented();
        }
    });

    fastify.get('/:id', {
        schema: {
            tags: ['properties'],
            params: PropertyIdSchema
        },
        onRequest: fastify.authenticate,
        handler: async function (request, reply) {
            /*const { id } = request.params as { id: string };
            const res = await query(`SELECT
                id,
                title,
                description,
                price,
                location,
                area,
                number_rooms,
                number_bathrooms,
                contact_details
                FROM properties WHERE id = ${id}`);
            if (res.rows.length === 0) {
                reply.code(404).send({ message: "Propiedad no encontrada" });
                return;
            }
            return res.rows[0];*/
            reply.notImplemented();
        }
    });

    fastify.delete('/:id', {
        schema: {
            tags: ['properties'],
            params: PropertyIdSchema
        },
        onRequest: fastify.authenticate,
        handler: async function (request, reply) {
            /*const { id } = request.params as { id: string };
            const res = await query(`DELETE FROM properties WHERE id = ${id} RETURNING id`);
            
            if (res.rowCount === 0) {
                reply.code(404).send({ message: "Propiedad no encontrada o ya eliminada" });
                return;
            }

            reply.code(200).send({ message: "Propiedad eliminada exitosamente" });
        }
    });

    fastify.put('/:id', {
        schema: {
            tags: ['properties'],
            body: PropertyPostSchema,
            params: PropertyIdSchema
        },
        onRequest: fastify.authenticate,
        handler: async function (request, reply) {
            const { id } = request.params as { id: string };
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
            reply.notImplemented();
        }
    });
    
};

export default propertyRoute;