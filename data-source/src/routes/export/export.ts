import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { connectToDatabase, getDatabase} from "../../services/mongodb.js";

const exportRoute: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions
): Promise<void> => {
    fastify.get("/", {
        schema: {
            description: "Exportar datos",
            summary: "Exportar datos",
            tags: ["export"],
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                501: {
                    type: "object",
                    properties: {
                        message: { type: "string" }
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            try {
                await connectToDatabase();
                const db = getDatabase();
                const collections = await db.listCollections().toArray();
                reply.send(collections.map((collection : any) => collection.name));
            } catch (error) {
                reply.status(500).send(error);
            }
        }
    });

    fastify.get("/:format", {
        schema: {
            description: "Exportar datos en un formato específico",
            summary: "Exportar datos",
            tags: ["export"],
            params: {
                type: "object",
                properties: {
                    format: { type: "string" }
                }
            },
            response:{
                200: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                501: {
                    type: "object",
                    properties: {
                        message: { type: "string" }
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

export default exportRoute;