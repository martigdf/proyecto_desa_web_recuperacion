import { FastifyInstance, FastifyRequest } from 'fastify';
import { scrapeAllProperties } from '../../scrapers/propertiesListScraper.js';
import { scrapePropertyDetails } from '../../scrapers/propertyDetailsScraper.js';
import { PropertyService } from '../../services/propertyService.js';
import { ScrapeResponse } from '../../types/schemas/property.js';

interface ScrapeQuerystring {
    url?: string;
    save?: boolean;
}

export async function scrapeRoutes(fastify: FastifyInstance): Promise<void> {
    const propertyService = new PropertyService();

    fastify.get<{
        Querystring: ScrapeQuerystring;
        Reply: ScrapeResponse;
    }>('/scrape', async (request, reply) => {
        const baseUrl = request.query.url || 'URL_POR_DEFECTO';
        const shouldSave = request.query.save !== false;

        try {
            const properties = await scrapeAllProperties(baseUrl);

            const detailedProperties = await Promise.all(
                properties.map(async (property) => {
                    const details = await scrapePropertyDetails(baseUrl + property.propertyUrl);
                    const detailedProperty = {
                        ...property,
                        details,
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
    });

    // Ruta para obtener propiedades de la base de datos
    fastify.get('/properties', async () => {
        const properties = await propertyService.getProperties();
        return { success: true, properties };
    });

    // Ruta para limpiar propiedades antiguas
    fastify.delete('/properties/cleanup/:days', async (request: FastifyRequest<{
        Params: { days: string }
    }>) => {
        const days = parseInt(request.params.days, 10);
        const deletedCount = await propertyService.deleteOldProperties(days);
        return { success: true, deletedCount };
    });
}