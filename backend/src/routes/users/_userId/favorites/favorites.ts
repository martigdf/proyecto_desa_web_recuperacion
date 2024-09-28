import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";
import {FavoritePostSchema, FavoriteIdSchema, FavoriteSchema} from "../../../../schemas/favorite/favoriteSchema.js";

const favoritesRoute: FastifyPluginAsync = async (fastify: FastifyInstance,
    opts: FastifyPluginOptions): Promise<void> => {

    fastify.get('/', {
        schema: {
            tags: ['favorites'],
            response: {
                200:{
                    description: 'Listado de favoritos',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: FavoriteSchema.properties
                    }
                }
            }
        },
        onRequest: fastify.authenticate,
        handler: async function (request, reply) {
            reply.notImplemented();
        }
    });

    fastify.post('/', {
        schema: {
            tags: ['favorites'],
            body: FavoritePostSchema,
            response: {
                201: {
                    description: 'Favorito creado',
                    type: 'object',
                    properties: FavoriteSchema.properties
                }
            }
        },
        onRequest: fastify.authenticate,
        handler: async function (request, reply) {
            reply.notImplemented();
        }
    });

    fastify.delete('/:id', {
        schema: {
            tags: ['favorites'],
            params: FavoriteIdSchema,
            response: {
                204: {
                    description: 'Favorito eliminado'
                }
            }
        },
        onRequest: fastify.authenticate,
        handler: async function (request, reply) {
            reply.notImplemented();
        }
    });
}

export default favoritesRoute;