import { FastifyPluginAsync } from "fastify";
import { query } from "../../../services/database.js";

const googleAuthRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post("/google", {
        schema: {
        summary: "Loguearse con google",
        description: "Ruta para loguearse usando google OAuth",
        tags: ["auth"],
        body: {
            type: "object",
            required: ["email"],
            properties: {
            email: { type: "string" },
            },
        },
        },
        handler: async (request, reply) => {
        const { email } = request.body as { email: string };

        try {
            const res = await query(
            "SELECT id, email, password, name, lastname, role FROM users WHERE email = $1",
            [email]
            );

            if (res.rows.length === 0) {
            return reply
                .code(404)
                .send({
                message: "No hay un usuario registrado con el email actual",
                });
            }

            const user = res.rows[0];
            const token = fastify.jwt.sign({ id: user.id }, { expiresIn: "3h" });

            return reply.send({
            token,
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                role: user.role,
            },
            });
        } catch (error) {
            console.error("Error querying the database:", error);
            return reply.code(500).send({ message: "Error interno del servidor" });
        }
        },
    });
};


export default googleAuthRoute;