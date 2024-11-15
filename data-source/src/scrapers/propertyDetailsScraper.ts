import axios from 'axios';
import * as cheerio from 'cheerio';
import { PropertyDetail } from '../types/schemas/property.js';

export async function scrapePropertyDetails(propertyUrl: string): Promise<PropertyDetail | null> {
    try {
        const response = await axios.get(propertyUrl);
        const $ = cheerio.load(response.data);

        const propertyDetails: PropertyDetail = {
            title: $('.items1__title').text().trim(),
            details: [],
            location: $('.items1__location').text().trim(),
        };

        $('.items1__ul li').each((_, element) => {
            const detail = $(element).text().trim();
            propertyDetails.details.push(detail);
        });

        return propertyDetails;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error scraping property details: ${error.message}`);
        }
        return null;
    }
}

export default scrapePropertyDetails;