import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { query } from '../../services/database.js';
import {
    UserIdSchema, UserPostSchema, UserPostType, UserSchema, UserPutSchema, UserPutType
} from "../../schemas/user/userSchema.js";
import bcrypt from 'bcryptjs';


const usersRoute: FastifyPluginAsync = async (fastify: FastifyInstance,
    opts: FastifyPluginOptions): Promise<void> => {
    fastify.get('/', {
        schema: {
            tags: ['users'],
            response: {
                200: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: UserSchema.properties
                    }
                }
            }
        },
        onRequest: fastify.verifyAdmin,
        handler: async function (request, reply) {
            const res = await query(`select
                id,
                name,
                lastname,
                email,
                role
                from users`);
            if(res.rows.length === 0) {
                reply.code(404).send({ message: "No hay usuarios registrados" });
                return;
            }
            return res.rows;
        }
    });

    fastify.get('/:id', {
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
           const { id } = request.params as { id: string };
           const res = await query (`select
            id,
            name,
            lastname,
            email,
            role,
            registration_date
            from users where id = ${id}`);
            if (res.rows.length === 0) {
                reply.code(404).send({ message: "Usuario no encontrado" });
                return;
              }
            const user = res.rows[0];
            return user;
        }
    });

    fastify.post('/', {
        schema: {
            tags: ['users'],
            body: UserPostSchema
        },
        handler: async function (request, reply) {
            const personaPost = request.body as UserPostType;
            const name = personaPost.name;
            const lastname = personaPost.lastname;
            const email = personaPost.email;
            const role = personaPost.role;
            const hashedPassword = await bcrypt.hash(personaPost.password, 10);
    
            try {
                const res = await query(
                    `INSERT INTO users
                    (name, lastname, email, password, role)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id;`,
                    [name, lastname, email, hashedPassword, role]
                );
    
                if (res.rowCount === 0) {
                    reply.code(404).send({ message: "Failed to insert user" });
                    return;
                }
    
                const id = res.rows[0].id;
                reply.code(201).send({
                    id,
                    name,
                    lastname,
                    email,
                    role
                });
            } catch (error) {
                console.error('Error al registrar al usuario:', error);
                reply.code(500).send({ message: "Error al registrar al usuario en la base de datos" });
            }
        }
    });

    fastify.put('/:id', {
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
            const personaPut = request.body as UserPutType;
            const name = personaPut.name;
            const lastname = personaPut.lastname;
            const email = personaPut.email;
            const role = personaPut.role;
            const hashedPassword = await bcrypt.hash(personaPut.password, 10);

            try {
                const res = await query(
                    `UPDATE users
                    SET name = COALESCE($1, name),
                        lastname = COALESCE($2, lastname),
                        email = COALESCE($3, email),
                        password = COALESCE($4, password),
                        role = COALESCE($5, role)
                    WHERE id = $6
                    RETURNING id;`,
                    [name, lastname, email, hashedPassword, role, id]
                );

                if (res.rowCount === 0) {
                    reply.code(404).send({ message: "Failed to update user" });
                    return;
                }

                reply.code(200).send({
                    id,
                    name,
                    lastname,
                    email,
                    role
                });
            } catch (error) {
                console.error('Error al actualizar al usuario:', error);
                reply.code(500).send({ message: "Error al actualizar al usuario en la base de datos" });
            }
        }
    });

    fastify.delete('/:id', {
        schema: {
            tags: ['users'],
            params: UserIdSchema
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