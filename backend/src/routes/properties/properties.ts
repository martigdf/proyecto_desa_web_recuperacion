import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import {
  PropertyIdSchema,
  PropertyGetQuerySchema,
} from "../../types/schemas/property/propertySchema.js";
import { query } from "../../services/database.js";

const propertyRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
): Promise<void> => {
  fastify.get("/", {
    schema: {
      description: "Obtener todas las propiedades",
      summary: "Obtener todas las propiedades registradas",
      tags: ["properties"],
      response: {
        200: {
          description: "Listado de propiedades",
          type: "array",
          items: PropertyGetQuerySchema,
        },
        404: {
          description: "No hay propiedades registradas",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        501: {
          description: "Not implemented",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: async function (request, reply) {
      const res = await query(`SELECT
                id,
                title,
                description,
                price,
                departamento,
                barrio,
                number_of_rooms,
                number_of_bathrooms,
                main_img_url,
                contact_data,
                property_type
                FROM properties`);
      if (res.rows.length === 0) {
        reply.code(404).send({ message: "No hay propiedades registradas" });
        return;
      }
      return res.rows;
    },
  });

  fastify.get("/:id", {
    schema: {
      description: "Obtener una propiedad",
      summary: "Obtener una propiedad por id",
      tags: ["properties"],
      params: PropertyIdSchema,
      response: {
        200: {
          description: "Propiedad encontrada",
          type: "object",
          properties: PropertyGetQuerySchema.properties,
        },
        404: {
          description: "Propiedad no encontrada",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        501: {
          description: "Not implemented",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: async function (request, reply) {
      const { id } = request.params as { id: string };
      const res = await query(`SELECT
                                         id,
                                         title,
                                         description,
                                         price,
                                         departamento,
                                         barrio,
                                         number_of_rooms,
                                         number_of_bathrooms,
                                         main_img_url,
                                         contact_data,
                                         property_type
                FROM properties WHERE id = ${id}`);
      if (res.rows.length === 0) {
        reply.code(404).send({ message: "Propiedad no encontrada" });
        return;
      }
      return res.rows[0];
    },
  });

  fastify.delete("/:id", {
    schema: {
      description: "Eliminar una propiedad",
      summary: "Eliminar una propiedad por id",
      tags: ["properties"],
      params: PropertyIdSchema,
      response: {
        200: {
          description: "Propiedad eliminada exitosamente",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        404: {
          description: "Propiedad no encontrada o ya eliminada",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        501: {
          description: "Not implemented",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    onRequest: fastify.verifyAdmin,
    handler: async function (request, reply) {
      const { id } = request.params as { id: string };
      const res = await query(
        `DELETE FROM properties WHERE id = ${id} RETURNING id`
      );

      if (res.rowCount === 0) {
        reply
          .code(404)
          .send({ message: "Propiedad no encontrada o ya eliminada" });
        return;
      }

      reply.code(200).send({ message: "Propiedad eliminada exitosamente" });
    },
  });

  fastify.put("/:id", {
    schema: {
      description: "Actualizar una propiedad",
      summary: "Actualizar una propiedad por id",
      tags: ["properties"],
      body: PropertyGetQuerySchema,
      params: PropertyIdSchema,
      response: {
        200: {
          description: "Propiedad actualizada exitosamente",
          type: "object",
          properties: PropertyGetQuerySchema.properties,
        },
        404: {
          description: "No se pudo actualizar la propiedad",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        501: {
          description: "Not implemented",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    onRequest: fastify.verifyAdmin,
    handler: async function (request, reply) {
      reply.status(501).send({ message: "Not implemented" });
    },
  });
};

export default propertyRoute;
