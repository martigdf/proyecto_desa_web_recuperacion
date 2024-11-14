import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { SourceIdSchema, JobIdSchema} from "../../types/schemas/id.js";
import { DataSourceSchema } from "../../types/schemas/property.js";

// Definición del plugin de ruta
const fetchRoute: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions
): Promise<void> => {
    fastify.post("/", {
        schema: {
            description: "Iniciar una nueva tarea de fetch",
            summary: "Iniciar una nueva tarea de fetch",
            tags: ["fetch"],
            body: SourceIdSchema,
            response: {
                200: {
                    type: "object",
                    properties: {
                        jobId: {type: "string"}
                    }
                },
                501: {
                    type: "object",
                    properties: {
                        message: {type: "string"}
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            reply.status(501).send({ message: "Not implemented" });
        }
    });

    fastify.post("/:sourceId", {
        schema: {
            description: "Inicial una nueva tarea de fetch, con el id de la fuente",
            summary: "Iniciar una nueva tarea de fetch",
            tags: ["fetch"],
            params: SourceIdSchema,
            body: DataSourceSchema,
            response: {
                200: {
                    type: "object",
                    properties: {
                        jobId: {type: "string"}
                    }
                },
                501: {
                    type: "object",
                    properties: {
                        message: {type: "string"}
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            reply.status(501).send({ message: "Not implemented" });
        }
    });

    fastify.get("/status/:jobId", {
        schema: {
            description: "Obtener el estado de una tarea de fetch",
            summary: "Obtener el estado de una tarea de fetch",
            tags: ["fetch"],
            params: JobIdSchema,
            response: {
                200: {
                    type: "object",
                    properties: {
                        status: {type: "string"}
                    }
                },
                404: {
                    type: "object",
                    properties: {
                        message: {type: "string"}
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            reply.status(501).send({ message: "Not implemented" });
        }
    });
}

export default fetchRoute;