import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { SourceIdSchema, JobIdSchema} from "../../types/schemas/id.js";

// Definición del plugin de ruta
const fetchRoute: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions
): Promise<void> => {
    fastify.post("/", {
        schema: {
            tags: ["fetch"],
            body: SourceIdSchema
        },
        onRequest: fastify.verifyAdmin,
        // Mandamos un not implemented
        handler: async function (request, reply) {
            reply.notImplemented();
        }
    });

    fastify.post("/:sourceId", {
        schema: {
            tags: ["fetch"],
            params: SourceIdSchema,
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            reply.notImplemented();
        }
    });

    fastify.get("/status/:jobId", {
        schema: {
            tags: ["fetch"],
            params: JobIdSchema,
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            reply.notImplemented();
        }
    });
}

export default fetchRoute;