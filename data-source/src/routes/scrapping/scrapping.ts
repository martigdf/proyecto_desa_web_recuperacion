import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import {JobIdSchema} from "../../types/schemas/id.js";

const scrappingRoute: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions
): Promise<void> => {
    fastify.post("/", {
        schema: {
            tags: ["scrape"],
        },
        onRequest: fastify.verifyAdmin,
        // Mandamos un not implemented
        handler: async function (request, reply) {
            reply.notImplemented();
        }
    });

    fastify.post("/:siteId", {
        schema: {
            tags: ["scrape"],
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            reply.notImplemented();
        }
    });

    fastify.get("/status/:jobId", {
        schema: {
            tags: ["scrape"],
            params: JobIdSchema
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            reply.notImplemented();
        }
    });
}

export default scrappingRoute;