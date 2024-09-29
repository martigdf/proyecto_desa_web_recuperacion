import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
// import {query} from "../../services/database.js";
import { ParamsSchema, CreateDataSourceSchema, UpdateDataSourceSchema, DataSourceSchema } from "../../types/schemas/data-source.js";

// Definición del plugin de ruta
const sourceRoute: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions
): Promise<void> => {
    fastify.post("/", {
        schema:{
            description: "Crear una nueva fuente de datos",
            summary: "Crear una nueva fuente de datos",
            tags: ["management"],
            body: CreateDataSourceSchema,
            response: {
                200: DataSourceSchema,
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

    fastify.get("/", {
        schema: {
            description: "Obtener todas las fuentes de datos",
            summary: "Obtener todas las fuentes de datos",
            tags: ["management"],
            response: {
                200: {
                    type: "array",
                    items: DataSourceSchema
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
            /*const res = await query(`SELECT * FROM data_sources;`);
            reply.send(res.rows);*/
            reply.status(501).send({ message: "Not implemented" });
        }
    });

    fastify.get("/:id", {
        schema: {
            description: "Obtener una fuente de datos por su id",
            summary: "Obtener una fuente de datos",
            tags: ["management"],
            params: ParamsSchema,
            response: {
                200: DataSourceSchema,
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

    fastify.put("/:id", {
        schema: {
            description: "Actualizar una fuente de datos",
            summary: "Actualizar una fuente de datos",
            tags: ["management"],
            params: ParamsSchema,
            body: UpdateDataSourceSchema,
            response: {
                200: DataSourceSchema,
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
            /*
            const { id } = request.params as { id: number };
            const { name, description } = request.body as { name: string, description: string };
            const res = await query(
                `UPDATE data_sources SET name = $1, description = $2 WHERE id = $3;`,
                [name, description, id]
            );
            if (res.rowCount === 0) {
                reply.code(404).send({ message: "Data source not found" });
                return;
            }
            reply.send({ success: true });*/
            reply.status(501).send({ message: "Not implemented" });
        }
    });

    fastify.delete("/:id", {
        schema: {
            description: "Eliminar una fuente de datos",
            summary: "Eliminar una fuente de datos",
            tags: ["management"],
            params: ParamsSchema,
            response: {
                200: {
                    type: "object",
                    properties: {
                        success: {type: "boolean"}
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
            /*
            const { id } = request.params as { id: number };
            const res = await query(`DELETE FROM data_sources WHERE id = $1;`, [id]);
            if (res.rowCount === 0) {
                reply.code(404).send({ message: "Data source not found" });
                return;
            }
            reply.send({ success: true });*/

            reply.status(501).send({ message: "Not implemented" });
        }
    });
}

export default sourceRoute;