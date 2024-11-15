import * as path from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import { fileURLToPath } from 'url';
import Fastify from 'fastify';
import { DatabaseService } from './services/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
  // Custom options for app below here.
  port: number;
} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {
  port: 5000
};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts) => {
  // Initialize the database before registering routes
  const dbService = DatabaseService.getInstance();
  await dbService.connect();

  // Register all plugins defined in the plugins directory
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: opts,
    forceESM: true
  });

  // Register all routes defined in the routes directory
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: opts,
    forceESM: true
  });

  // Graceful shutdown
  const gracefulShutdown = async (): Promise<void> => {
    await dbService.disconnect();
    process.exit(0);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};

const start = async (): Promise<void> => {
  const fastifyInstance = Fastify();  // Initialize Fastify instance
  try {
    await fastifyInstance.register(app, options);  // Register the app plugin
    await fastifyInstance.listen({ port: options.port });
    console.log(`Server listening on port ${options.port}`);
  } catch (err) {
    fastifyInstance.log.error(err);
    await DatabaseService.getInstance().disconnect(); // Está tirando error y se desconecta je
    process.exit(1);
  }
};

start();

export default app;
export { app, options };
