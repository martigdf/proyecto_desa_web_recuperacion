import fs from 'fs';
import path from 'path';
import { connectToDatabase, getDatabase } from './mongodb.js';
import jsonlines from 'jsonlines';

const importJSONLToMongoDB = async (filePath: any) => {
    await connectToDatabase();
    const db = getDatabase();
    const collection = db.collection('properties');

    const reader = jsonlines.parse();

    fs.createReadStream(filePath)
        .pipe(reader)
        .on('data', async (data) => {
            try {
                await collection.insertOne(data);
            } catch (error) {
                console.error('Error inserting data:', error);
            }
        })
        .on('end', () => {
            console.log('Import completed!');
        });
};

const jsonlFilePath = path.join(process.cwd(), 'data', 'data.jsonl');
importJSONLToMongoDB(jsonlFilePath);