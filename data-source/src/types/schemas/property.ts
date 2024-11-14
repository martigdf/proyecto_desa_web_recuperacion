//import { Type } from '@sinclair/typebox'

import { Document } from 'mongodb';

export interface PropertyDetail {
    title: string;
    details: string[];
    location: string;
}

export interface PropertyListing {
    title: string;
    propertyUrl: string;
    details: string[];
    location: string;
}

export interface DetailedProperty extends PropertyListing {
    details: PropertyDetail | null;
    createdAt: Date;
    updatedAt: Date;
    propertyId: string; // ID único de la propiedad en el sitio web
    lastScrapedAt: Date;
}

export interface PropertyDocument extends DetailedProperty, Document {}