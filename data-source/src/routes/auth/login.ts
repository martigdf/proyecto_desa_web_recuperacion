import { FastifyPluginAsync } from "fastify";
import { query } from '../../services/postgresDatabase.js';
import bcrypt from 'bcryptjs';

const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/login', {
        schema: {
            summary: 'Login',
            description: 'Ruta para loguearse usando email y contraseña',
            tags: ['auth'],
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            response: {
                200: {
                    description: 'Datos del usuario dentro del token',
                    type: 'object',
                    properties: {
                        token: {type: 'string'},
                        id: {type: 'number'},
                        user: {
                            type: 'object',
                            properties: {
                                name: {type: 'string'},
                                lastname: {type: 'string'}
                            }
                        }
                    }
                },
                401: {
                    description: 'Credenciales incorrectas',
                    type: 'object',
                    properties: {
                        message: {type: 'string'}
                    }
                },
                404: {
                    description: 'Usuario no encontrado',
                    type: 'object',
                    properties: {
                        message: {type: 'string'}
                    }
                }
            }
        },
        handler: async (request, reply) => {
            const { email, password } = request.body as { email: string, password: string };
            const res = await query(`select id, email, password, name, lastname, role from users where email = '${email}'`);
            if (res.rows.length === 0) {
                reply.code(404).send({ message: 'User not found' });
                return;
            }
            const user = res.rows[0];
            if (!await bcrypt.compare(password, user.password)) {
                reply.code(401).send({ message: 'Wrong password' });
                return;
            }

            // Si el usuario no es administrador, no puede loguearse
            if (user.role !== 'admin') {
                reply.code(401).send({message: 'You are not an admin'});
                return;
            }

            const token = fastify.jwt.sign({ id: user.id }, { expiresIn: '1h' });

            reply.send({ success: true, token, id: user.id, user: { name: user.name, lastname: user.lastname } });

        }
    });
};

export default authRoute;