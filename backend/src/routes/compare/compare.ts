import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";

const compareRoute: FastifyPluginAsync = async (fastify: FastifyInstance,
    opts: FastifyPluginOptions): Promise<void> => {
    // POST /compare
    fastify.post('/', {
        schema: {
            tags: ['compare'],
        },
        handler: async function (request, reply) {
            reply.status(501).send({ message: "Not implemented" });
        }
    });

    // GET /compare/:id
    fastify.get('/:id', {
        schema: {
            tags: ['compare'],
            //params:
        },
        handler: async function (request, reply) {
            reply.status(501).send({ message: "Not implemented" });
        }
    });
};

export default compareRoute;