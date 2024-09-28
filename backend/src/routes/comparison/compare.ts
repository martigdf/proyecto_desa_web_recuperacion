import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";

const compareRoute: FastifyPluginAsync = async (fastify: FastifyInstance,
    opts: FastifyPluginOptions): Promise<void> => {
    // POST /compare
    fastify.post('/compare', {
        schema: {
            tags: ['compare'],
        },
        onRequest: fastify.authenticate,
        handler: async function (request, reply) {
        return reply.notImplemented();
        }
    });

    // GET /compare/:id
    fastify.get('/compare/:id', {
        schema: {
            tags: ['compare'],
            //params:
        },
        onRequest: fastify.authenticate,
        handler: async function (request, reply) {
        return reply.notImplemented();
        }
    });
};

export default compareRoute;