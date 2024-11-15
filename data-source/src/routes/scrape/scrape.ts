import {FastifyPluginAsync, FastifyPluginOptions, FastifyRequest} from 'fastify';
import { FastifyInstance } from 'fastify/types/instance.js';
import { scrapeAllProperties } from '../../scrapers/propertiesListScraper.js';
import { scrapePropertyDetails } from '../../scrapers/propertyDetailsScraper.js';
import { PropertyService } from '../../services/propertyService.js';
/*import { ScrapeResponse } from '../../types/schemas/property.js';

interface ScrapeQuerystring {
    url?: string;
    save?: boolean;
}*/

const scrapeRoutes: FastifyPluginAsync = async (fastify: FastifyInstance, opts: FastifyPluginOptions): Promise<void> => {
    const propertyService = new PropertyService();

    fastify.get('/scrape', {
        schema: {
            description: "Scrape propiedades desde una URL",
            summary: "Inicia el scraping de propiedades",
            tags: ['scraping'],
            response: {
                200: {
                    description: "Scraping exitoso",
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        properties: {
                            type: "array",
                            items: { type: "object" } // Definir esquema adecuado aquí
                        }
                    }
                },
                500: {
                    description: "Error en el scraping",
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        error: { type: "string" }
                    }
                }
            },
            params: {
                type: 'object',
                properties: {
                    url: { type: 'string' }
                }
            },
        },
        handler: async function (request, reply) {
            const baseUrl = request.params as string;
            const shouldSave = true;

            try {
                const properties = await scrapeAllProperties(baseUrl);

                const detailedProperties = await Promise.all(
                    properties.map(async (property) => {
                        const details = await scrapePropertyDetails(baseUrl + property.propertyUrl);
                        const detailedProperty = {
                            ...property,
                            moreDetails: details,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            lastScrapedAt: new Date(),
                            propertyId: '' // Se establecerá en el servicio
                        };

                        if (shouldSave) {
                            await propertyService.upsertProperty(detailedProperty);
                        }

                        return detailedProperty;
                    })
                );

                return {
                    success: true,
                    properties: detailedProperties
                };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                return {
                    success: false,
                    error: errorMessage
                };
            }
        }
    });

    // Ruta para obtener propiedades de la base de datos
    fastify.get('/properties', {
        schema: {
            description: "Obtener todas las propiedades",
            summary: "Recuperar todas las propiedades registradas",
            tags: ['properties'],
            response: {
                200: {
                    description: "Lista de propiedades",
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        properties: { type: "array" } // Definir esquema adecuado aquí
                    }
                }
            }
        },
        handler: async () => {
            const properties = await propertyService.getProperties();
            return { success: true, properties };
        }
    });

    // Ruta para limpiar propiedades antiguas
    fastify.delete('/properties/cleanup/:days', {
        schema: {
            description: "Eliminar propiedades antiguas",
            summary: "Limpiar propiedades que tienen más de un número específico de días",
            tags: ['properties'],
            params: {
                type: 'object',
                properties: {
                    days: { type: 'string' }
                }
            },
            response: {
                200: {
                    description: "Propiedades eliminadas correctamente",
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        deletedCount: { type: "number" }
                    }
                }
            }
        },
        handler: async (request: FastifyRequest<{
            Params: { days: string }
        }>) => {
            const days = parseInt(request.params.days, 10);
            const deletedCount = await propertyService.deleteOldProperties(days);
            return { success: true, deletedCount };
        }
    });
};

export default scrapeRoutes;