import { MongoClient } from 'mongodb';

const url = 'mongodb://mongo:27017';
const dbName = 'example_db';

let db: any;

export const connectToDatabase = async () => {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to Database');
    db = client.db(dbName); // Access your database
};

export const getDatabase = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db; // Return the initialized database
};