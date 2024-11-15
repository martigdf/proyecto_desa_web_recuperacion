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
    moreDetails: PropertyDetail | null;
    createdAt: Date;
    updatedAt: Date;
    propertyId: string; // ID único de la propiedad en el sitio web
    lastScrapedAt: Date;
}

export interface ScrapeResponse {
    success: boolean;
    properties?: DetailedProperty[];
    error?: string;
}

export interface PropertyDocument extends DetailedProperty, Document {}

// Una interfaz para pasar los datos de la propiedad a la base de datos
export interface PropertyData {
    propertyId: string;
    title: string;
    propertyUrl: string;
    details: string[];
    location: string;
    moreDetails: PropertyDetail | null;
    createdAt: Date;
    updatedAt: Date;
    lastScrapedAt: Date;
}

// Una interfaz para pasar los datos de la propiedad a la base de datos
export interface CreatePropertyData {
    title: string;
    propertyUrl: string;
    details: string[];
    location: string;
    moreDetails: PropertyDetail | null;
    createdAt: Date;
    updatedAt: Date;
    lastScrapedAt: Date;
}