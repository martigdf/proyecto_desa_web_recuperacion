import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import { query } from '../../services/database.js';
import { UserPostSchema, UserPostType } from "../../schemas/user/userSchema.js";
import bcrypt from 'bcryptjs';


const usersRoute: FastifyPluginAsync = async (fastify: FastifyInstance,
    opts: FastifyPluginOptions): Promise<void> => {
    fastify.post('/register', {
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
}

export default usersRoute;