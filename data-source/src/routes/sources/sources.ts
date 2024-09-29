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
        schema: {
            tags: ["management"],
            body: CreateDataSourceSchema
        },
        onRequest: fastify.verifyAdmin,
        // Mandamos un not implemented
        handler: async function (request, reply) {
            reply.status(501).send({ message: "Not implemented" });
        }
    });

    fastify.get("/", {
        schema: {
            tags: ["management"],
            response: {
                200: {
                    type: "array",
                    items: DataSourceSchema
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
            tags: ["management"],
            params: ParamsSchema,
            response: {
                200: DataSourceSchema
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            reply.status(501).send({ message: "Not implemented" });
        }
    });

    fastify.put("/:id", {
        schema: {
            tags: ["management"],
            params: ParamsSchema,
            body: UpdateDataSourceSchema
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
            tags: ["management"],
            params: ParamsSchema
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