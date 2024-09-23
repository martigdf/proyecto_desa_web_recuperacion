import { FastifyPluginAsync } from 'fastify';
import sensible from '@fastify/sensible';

const plugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(sensible);
};

export default plugin;