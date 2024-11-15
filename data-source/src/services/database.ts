import { MongoClient, Db, Collection, Document } from 'mongodb';
import { DB_CONFIG } from '../config/dbConfig.js';
import {PropertyData} from '../types/schemas/property.js';

export class DatabaseService {
    private static instance: DatabaseService;
    private client: MongoClient;
    private db: Db | null = null;

    private constructor() {
        this.client = new MongoClient(DB_CONFIG.uri);
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            this.db = this.client.db(DB_CONFIG.dbName);
            console.log('Connected to MongoDB');

            // Crear índices
            await this.createIndexes();
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }

    private async createIndexes(): Promise<void> {
        if (!this.db) throw new Error('Database not connected');

        await this.db.collection(DB_CONFIG.collections.properties).createIndexes([
            { key: { propertyId: 1 }, unique: true },
            { key: { createdAt: 1 } },
            { key: { lastScrapedAt: 1 } }
        ]);
    }

    getCollection<T extends Document = PropertyData>(name: string): Collection<T> {
        if (!this.db) throw new Error('Database not connected');
        return this.db.collection<T>(name);
    }

    async disconnect(): Promise<void> {
        await this.client.close();
        console.log('Disconnected from MongoDB');
    }
}