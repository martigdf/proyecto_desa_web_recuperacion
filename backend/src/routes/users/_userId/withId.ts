import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { query } from '../../../services/database.js';
import {
    UserIdSchema, UserSchema, UserPutSchema, UserPutType
} from "../../../schemas/user/userSchema.js";
import bcrypt from 'bcryptjs';


const usersRoute: FastifyPluginAsync = async (fastify: FastifyInstance, opts: FastifyPluginOptions): Promise<void> => {
    fastify.get('/', {
        schema: {
            tags: ['users'],
            params: UserIdSchema,
            response: {
                200: {
                    type: 'object',
                    properties: UserSchema.properties
                }
            },
        },
        onRequest: fastify.verifySelfOrAdmin,
        handler: async function name(request, reply) {
            const {id} = request.params as { id: string };
            const res = await query(`select id,
                    name,
                    lastname,
                    email,
                    role,
                    registration_date
                from users where id = ${id}`);
            if (res.rows.length === 0) {
                reply.code(404).send({message: "Usuario no encontrado"});
                return;
            }
            const user = res.rows[0];
            return user;
        }
    });

    fastify.put('/', {
        schema:{
            tags: ['users'],
            body: UserPutSchema,
            params: UserIdSchema,
            response: {
                200: {
                    type: 'object',
                    properties: UserSchema.properties
                }
            }
        },
        onRequest: fastify.verifySelfOrAdmin,
        handler: async function (request, reply) {
            const { id } = request.params as { id: string };

            const { name, lastname, email, role, password } = request.body as UserPutType;
            const fields = [];
            const values = [];
            if (name) {
                fields.push('name');
                values.push(name);
            }
            if (lastname) {
                fields.push('lastname');
                values.push(lastname);
            }
            if (email) {
                fields.push('email');
                values.push(email);

            }
            if (role) {
                fields.push('role');
                values.push(role);
            }
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                fields.push('password');
                values.push(hashedPassword);
            }
            if (fields.length === 0) {
                reply.code(400).send({ message: "No hay campos a actualizar" });
                return;
            }
            const setFields = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
            try {
                const res = await query(`UPDATE users SET ${setFields} WHERE id = ${id} RETURNING id, name, lastname, email, role`, values);
                if (res.rows.length === 0) {
                    reply.code(404).send({ message: "Usuario no encontrado" });
                    return;
                }
                return res.rows[0];
            } catch (error) {
                console.error('Error al actualizar al usuario:', error);
                reply.code(500).send({ message: "Error al actualizar al usuario en la base de datos" });
            }
        }
    });

    fastify.delete('/', {
        schema: {
            tags: ['users'],
            params: UserIdSchema,
            response: {
                204: {
                    description: "Usuario eliminado"
                },
                404: {
                    description: "Usuario no encontrado"
                }
            },
        },
        onRequest: fastify.verifySelfOrAdmin,
        handler: async function (request, reply) {
            const { id } = request.params as { id: string };
            const res = await query(`DELETE FROM users WHERE id = ${id}`);
            if (res.rowCount === 0) {
                reply.code(404).send({ message: "Usuario no encontrado" });
                return;
            }
            reply.code(204).send();
        }
    });
}

export default usersRoute;