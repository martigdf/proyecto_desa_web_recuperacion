import * as path from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import Fastify, { FastifyPluginAsync } from 'fastify';
import { fileURLToPath } from 'url';
import { DatabaseService } from './services/database.js'; // Import the database service

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type AppOptions = {
  // Place your custom options for app below here.
  port: number;
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
  port: 5000
};

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Initialize the database before registering routes
  const dbService = DatabaseService.getInstance();
  await dbService.connect();

  // Register all plugins defined in the plugins directory
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: opts,
    forceESM: true
  });

  // Register all routes defined in the routes directory
  void fastify.register(AutoLoad, {
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

// Exporting app and options
export default app;
export { app, options };

// Server starting logic
const start = async (): Promise<void> => {
  const fastify = Fastify({ logger: true });
  try {
    await fastify.listen({ port: options.port });
    console.log(`Server listening on port ${options.port}`);
  } catch (err) {
    fastify.log.error(err);
    await DatabaseService.getInstance().disconnect();
    process.exit(1);
  }
};

start();
