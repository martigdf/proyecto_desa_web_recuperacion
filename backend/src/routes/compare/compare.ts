import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";

const compareRoute: FastifyPluginAsync = async (fastify: FastifyInstance,
    opts: FastifyPluginOptions): Promise<void> => {
    // POST /compare
    fastify.post('/', {
        schema: {
            description: "Comparar dos propiedades",
            summary: "Realizar una comparación entre dos propiedades",
            tags: ['compare'],
            response: {
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
            reply.status(501).send({ message: "Not implemented" });
        }
    });

    // GET /compare/:id
    fastify.get('/:id', {
        schema: {
            description: "Obtener una comparación",
            summary: "Obtener una comparación por id",
            tags: ['compare'],
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: { type: "string" }
                }
            },
            response: {
                501: {
                    description: "Not implemented",
                    type: "object",
                    properties: {
                        message: {type: "string"}
                    }
                }
            }
        },
        handler: async function (request, reply) {
            reply.status(501).send({ message: "Not implemented" });
        }
    });
};

export default compareRoute;