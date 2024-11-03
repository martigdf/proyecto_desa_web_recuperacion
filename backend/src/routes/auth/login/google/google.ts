import { FastifyPluginAsync } from "fastify";
import { query } from "../../../../services/database.js";
const googleAuth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // Endpoint de callback después del login exitoso
  fastify.get("/callback", {
    schema: {
      tags: ["google"],
    },
    handler: async function (request, reply) {
      try {
        const googletoken =
          await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
            request
          );

        const userinfo = await fastify.googleOAuth2.userinfo(
          googletoken.token.access_token
        );

        // Para facilitar el llamado de las propiedades del objeto lo procesamos de json a string y viceversa.
        const userinfoString = JSON.stringify(userinfo);

        // Parsear la cadena JSON de nuevo a un objeto
        const parsedUserinfo = JSON.parse(userinfoString);

        // Acceder a las propiedades del usuario
        const email = parsedUserinfo.email;
        const given_name = encodeURIComponent(parsedUserinfo.given_name);
        const family_name = encodeURIComponent(parsedUserinfo.family_name);

        // Consulta a la base de datos
        const res = await query(
          `SELECT id, name, lastname FROM users WHERE email = $1`,
          [email]
        );

        if (res.rows.length === 0) {
          reply.redirect(
            `https://localhost/register?email=${email}&given_name=${given_name}&family_name=${family_name}`
          );
          return;
        }
        const user = res.rows[0];
        const token = fastify.jwt.sign(
          { user: user, id: user.id },
          { expiresIn: "3h" }
        );
        reply.redirect(`https://localhost/login?token=${token}&email=${email}`);
      } catch (error) {
        console.error("Error al obtener el token de acceso:", error);
        reply.status(500).send({ error: "Error al procesar la autenticación" });
      }
    },
  });

  fastify.post("/login", {
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
          return reply.code(404).send({
            message: "No hay un usuario registrado con el email actual",
          });
        }

        const user = res.rows[0];

        return reply.send({
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          role: user.role,
        });
      } catch (error) {
        console.error("Error querying the database:", error);
        return reply.code(500).send({ message: "Error interno del servidor" });
      }
    },
  });
};

export default googleAuth;
