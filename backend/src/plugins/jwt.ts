import jwt, { FastifyJWTOptions } from "@fastify/jwt";
import fp from "fastify-plugin";
import { FastifyReply, FastifyRequest } from "fastify";
import { authenticateFunction } from '../types/fastify.js';

const jwtOptions: FastifyJWTOptions = {
    secret: 'supersecret'
};

export default fp(async (fastify) => {
    fastify.register(jwt, jwtOptions);

    const authenticate: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.code(401).send({ error: 'Unauthorized' });
        }
    };

    fastify.decorate("authenticate", authenticate);

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

    const verifySelfOrAdmin: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
        try{
            await request.jwtVerify();
            const { id, role } = request.user as { id: number, role: string };
            const { id: userId } = request.params as { id: string };
            if (role === 'admin' || id === Number(userId)) {
                return;
            }
        } catch (err) {
            reply.code(401).send({error: 'Unauthorized'})
        }
    }

    fastify.decorate("verifySelfOrAdmin", verifySelfOrAdmin);
});
