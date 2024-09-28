import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";

const compareRoute: FastifyPluginAsync = async (fastify: FastifyInstance,
    opts: FastifyPluginOptions): Promise<void> => {
    // POST /compare
    fastify.post('/compare', async (request, reply) => {
    return reply.status(501).send();
    });

    // GET /compare/:id
    fastify.get('/compare/:id', async (request, reply) => {
    //const { id } = request.params as { id: string };
    return reply.status(501).send();
    });
};

export default compareRoute;