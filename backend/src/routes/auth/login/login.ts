import { FastifyPluginAsync } from "fastify";
import { query } from "../../../services/database.js";
import bcrypt from "bcryptjs";

const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", {
    schema: {
      summary: "Hacer login",
      description: "Ruta para loguearse usando email y contraseña",
      tags: ["auth"],
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: async (request, reply) => {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };
      const res = await query(
        `select id, email, password, name, lastname, role from users where email = '${email}'`
      );
      if (res.rows.length === 0) {
        reply.code(404).send({ message: "Usuario no encontrado" });
        return;
      }
      const user = res.rows[0];
      if (!(await bcrypt.compare(password, user.password))) {
        reply.code(401).send({ message: "Contraseña incorrecta" });
        return;
      }

      const token = fastify.jwt.sign({ id: user.id }, { expiresIn: "3h" });

      reply.send({
        token,
        user: {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          role: user.role,
        },
      });
    },
  });
};

export default authRoute;
