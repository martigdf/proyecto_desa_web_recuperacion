import axios from 'axios';
import * as cheerio from 'cheerio';
import { PropertyListing } from '../types/schemas/property.js';

export async function scrapeAllProperties(baseUrl: string): Promise<PropertyListing[]> {
    try {
        const response = await axios.get(baseUrl);
        const $ = cheerio.load(response.data);
        const properties: PropertyListing[] = [];

        $('.items1__text').each((_, element: any) => {
            const $element = $(element);
            const propertyUrl = $element.find('h2 a').attr('href') || '';
            const title = $element.find('h2 a').text().trim();

            const details: string[] = [];
            $element.find('.items1__ul li').each((_, li) => {
                details.push($(li).text().trim());
            });

            const location = $element.find('.items1__location').text().trim();

            properties.push({
                title,
                propertyUrl,
                details,
                location
            });
        });

        return properties;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error scraping properties: ${error.message}`);
        }
        return [];
    }
}

export default scrapeAllProperties;