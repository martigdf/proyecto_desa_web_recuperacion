import { Collection } from 'mongodb';
import { DatabaseService } from './database.js';
import { PropertyDocument, DetailedProperty } from '../types/schemas/property.js';
import { DB_CONFIG } from '../config/dbConfig.js';

export class PropertyService {
    private collection: Collection<PropertyDocument>;

    constructor() {
        const dbService = DatabaseService.getInstance();
        if (!dbService) {
            throw new Error('DatabaseService instance is not initialized');
        }
        if (!dbService['db']) {
            throw new Error('Database not connected');
        }
        this.collection = dbService.getCollection<PropertyDocument>(DB_CONFIG.collections.properties);
    }

    async upsertProperty(property: DetailedProperty): Promise<void> {
        const propertyId = this.extractPropertyId(property.propertyUrl);

        const update = {
            $set: {
                ...property,
                propertyId,
                lastScrapedAt: new Date(),
                updatedAt: new Date()
            },
            $setOnInsert: {
                createdAt: new Date()
            }
        };

        await this.collection.updateOne(
            { propertyId },
            update,
            { upsert: true }
        );
    }

    private extractPropertyId(url: string): string {
        const match = url.match(/idprop=(\d+)/);
        if (!match) throw new Error(`Could not extract property ID from URL: ${url}`);
        return match[1];
    }

    async getProperties(query: Partial<PropertyDocument> = {}): Promise<PropertyDocument[]> {
        return this.collection.find(query).toArray();
    }

    async deleteOldProperties(daysOld: number): Promise<number> {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysOld);

        const result = await this.collection.deleteMany({
            lastScrapedAt: { $lt: cutoffDate }
        });

        return result.deletedCount;
    }
}
