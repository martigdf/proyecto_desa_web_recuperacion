import { computed, Injectable, signal } from '@angular/core';
import { Property } from '../interfaces/property';
import { CompareItem } from '../interfaces/compare-item';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private compareList = signal<CompareItem[]>([]);

  constructor() {}
  private properties = signal<Property[]>([
    {
      id: 1,
      title: 'Casa en la playa',
      description:
        'Una hermosa casa frente al mar con acceso privado a la playa.',
      price: 300000,
      location: 'Maldonado', // Departamento de Uruguay
      area: 200,
      number_of_rooms: 3,
      number_of_bathrooms: 2,
      contact_details: 'contacto1@example.com',
      img_url:
        'https://st.depositphotos.com/1005891/4951/i/450/depositphotos_49516857-stock-photo-beach-house-with-bridge-in.jpg', // Imagen de stock
    },
    {
      id: 2,
      title: 'Apartamento en el centro',
      description: 'Moderno apartamento en el corazón de la ciudad.',
      price: 150000,
      location: 'Montevideo', // Departamento de Uruguay
      area: 80,
      number_of_rooms: 2,
      number_of_bathrooms: 1,
      contact_details: 'contacto2@example.com',
      img_url:
        'https://st5.depositphotos.com/81210664/66974/i/450/depositphotos_669741344-stock-photo-living-room-interior-projector-displayed.jpg', // Imagen de stock
    },
    {
      id: 3,
      title: 'Casa de campo',
      description:
        'Acogedora casa de campo rodeada de naturaleza y tranquilidad.',
      price: 900,
      location: 'Colonia', // Departamento de Uruguay
      area: 150,
      number_of_rooms: 4,
      number_of_bathrooms: 2,
      contact_details: 'contacto3@example.com',
      img_url:
        'https://cdn.create.vista.com/api/media/small/664926284/stock-photo-modern-brick-house-large-windows-green-lawn-cottage-town', // Imagen de stock
    },
    {
      id: 4,
      title: 'Casa supermoderna',
      description:
        'Acogedora casa de campo rodeada de naturaleza y tranquilidad.',
      price: 1000,
      location: 'Rocha', // Departamento de Uruguay
      area: 150,
      number_of_rooms: 7,
      number_of_bathrooms: 2,
      contact_details: 'contacto3@example.com',
      img_url:
        'https://th.bing.com/th/id/R.0225ac52205a32cc2d0c6772f08da20e?rik=%2f4KiACKj4A0d1g&pid=ImgRaw&r=0', // Imagen de stock
    },
    {
      id: 5,
      title: 'Casa de campo',
      description:
        'Acogedora casa de campo rodeada de naturaleza y tranquilidad.',
      price: 7000,
      location: 'Salto', // Departamento de Uruguay
      area: 150,
      number_of_rooms: 4,
      number_of_bathrooms: 2,
      contact_details: 'contacto3@example.com',
      img_url:
        'https://cdn.create.vista.com/api/media/small/664926284/stock-photo-modern-brick-house-large-windows-green-lawn-cottage-town', // Imagen de stock
    },
    {
      id: 6,
      title: 'Casa de mikimouse',
      description:
        'Miska muska mikimouse.',
      price: 0,
      location: 'El medio de la nada',
      area: 150,
      number_of_rooms: 4,
      number_of_bathrooms: 2,
      contact_details: 'contacto3@example.com',
      img_url:
        'https://i.pinimg.com/736x/a2/d0/34/a2d0349b4d4c3dc993af1baf277f356e--mickey-mouse-clubhouse-song-lyrics.jpg', // Imagen de stock
    }
  ]);

  getProperties = computed(() => this.properties);

  getPropertyById(id: number) {
    return computed(() =>
      this.properties().find((property) => property.id === id)
    );
  }

  getCompareList = computed(() => this.compareList);

  addToCompare(property: Property) {
    const maxCompareLimit = 4; // Establece el límite de propiedades en la lista de comparación
    this.compareList.update((compareList) => {
      // Si ya hay 4 propiedades en la lista, no agrega más
      if (compareList.length >= maxCompareLimit) {
        return compareList;
      }

      // Verifica si la propiedad ya está en la lista
      const existingProperty = compareList.find(
        (prop) => prop.property.id === property.id
      );

      // Si no está en la lista, agregarla
      if (!existingProperty) {
        return [...compareList, { property }];
      } else {
        return compareList; // Si ya está en la lista, no hacer nada
      }
    });
  }
  
  removeFromCompare(propertyId: number){
    this.compareList.update(compareList => compareList.filter(prop => prop.property.id!== propertyId));
  }

  removeProperty(propertyId: number) {
    this.properties.update((properties) =>
      properties.filter((property) => property.id !== propertyId)
    );
  }
}
