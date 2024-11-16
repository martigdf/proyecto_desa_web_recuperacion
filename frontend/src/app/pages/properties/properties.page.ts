import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PropertyService } from '../../services/property.service';
import { PropertiesTableComponent } from '../../components/properties-table/properties-table.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [IonicModule, PropertiesTableComponent, NgIf],
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage {
  private propertyService = inject(PropertyService);

  propertiesList = this.propertyService.getProperties();

  constructor() {
    this.propertyService.fetchProperties();
    console.log('PropertiesPage constructor');
    console.log(this.propertiesList);
  }
}
