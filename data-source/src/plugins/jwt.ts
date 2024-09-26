import jwt, { FastifyJWTOptions } from "@fastify/jwt";
import fp from "fastify-plugin";
import { FastifyReply, FastifyRequest } from "fastify";
import { authenticateFunction } from '../types/fastify.js';

const jwtOptions: FastifyJWTOptions = {
    secret: 'man-supersecret'
};

export default fp(async (fastify) => {
    fastify.register(jwt, jwtOptions);

    // Verificamos que el usuario es un administrador, sino no tiene acceso a ninguna ruta
    const verifyAdmin: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
            const { rol } = request.user as { rol: string };
            if (rol !== 'admin') {
                reply.code(401).send({ error: 'Unauthorized, you must be an admin' });
            }
        } catch (err) {
            reply.code(401).send({ error: 'Unauthorized' });
        }
    }

    fastify.decorate("verifyAdmin", verifyAdmin);
});
