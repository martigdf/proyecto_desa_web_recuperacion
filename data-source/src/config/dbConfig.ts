export const DB_CONFIG = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME || 'property_scraper',
    collections: {
        properties: 'properties'
    }
};