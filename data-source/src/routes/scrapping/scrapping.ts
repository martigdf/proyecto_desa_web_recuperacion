import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import {JobIdSchema} from "../../types/schemas/id.js";

const scrappingRoute: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions
): Promise<void> => {
    fastify.post("/", {
        schema: {
            description: "Iniciar una nueva tarea de scrapping",
            summary: "Iniciar una nueva tarea",
            tags: ["scrape"],
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

    fastify.post("/:siteId", {
        schema: {
            description: "Iniciar una nueva tarea de scrapping, con el id del sitio",
            summary: "Iniciar una nueva tarea",
            tags: ["scrape"],
            params: JobIdSchema,
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
            description: "Obtener el estado de una tarea de scrapping",
            summary: "Obtener el estado de una tarea",
            tags: ["scrape"],
            params: JobIdSchema,
            response: {
                200: {
                    type: "object",
                    properties: {
                        status: {type: "string"}
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
}

export default scrappingRoute;