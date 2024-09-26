import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { query } from '../../services/database.js';
import { UsuarioIdSchema, UsuarioPostSchema, UsuarioPostType } from "../../schemas/usuario/UsuarioSchema.js";
import bcrypt from 'bcryptjs';


const usersRoute: FastifyPluginAsync = async (fastify: FastifyInstance,
    opts: FastifyPluginOptions): Promise<void> => {
    fastify.get('/', {
        schema: {
            tags: ['users'],
        },
        onRequest: fastify.authenticate,
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
            params: UsuarioIdSchema
        },
        onRequest: fastify.authenticate,
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
            body: UsuarioPostSchema
        },
        handler: async function (request, reply) {
            const personaPost = request.body as UsuarioPostType;
            const name = personaPost.name.value;
            const lastname = personaPost.lastname.value;
            const email = personaPost.email.value;
            const role = personaPost.role;
            const hashedPassword = await bcrypt.hash(personaPost.password.value, 10);
    
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
}

export default usersRoute;