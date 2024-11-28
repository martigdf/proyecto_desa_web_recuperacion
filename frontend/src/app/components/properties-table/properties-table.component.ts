import { Component, OnInit, inject, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PropertyService } from '../../services/property.service';
import {NgFor} from '@angular/common';
import { Property } from '../../interfaces/property';
import { Router } from '@angular/router';
import { eye, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-properties-table',
  standalone: true,
  imports: [
    IonicModule,
    NgFor,
  ],
  templateUrl: './properties-table.component.html',
  styleUrls: ['./properties-table.component.scss'],
})
export class PropertiesTableComponent  implements OnInit {
  private propertyService = inject(PropertyService);
  private router = inject(Router);
  @Input() itemList!: Property[];

  constructor() { 
    addIcons({ trash, eye});
  }

  propertiesList = this.propertyService.getProperties();

  get hasFewProperties(): boolean {
    const properties = this.propertiesList();
    return properties && properties.length < 3;
  }

  removeProperty(item: Property) {
    this.propertyService.removeProperty(item.id);
  }

  goToviewProperty(item: Property) {
    this.router.navigate([`/property-view/${item.id}`]);
  }

  ngOnInit() {}

}
