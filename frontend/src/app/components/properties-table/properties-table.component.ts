import { Component, OnInit, inject, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PropertyService } from '../../services/property.service';
import {NgFor, NgIf} from '@angular/common';
import { Property } from '../../interfaces/property';

@Component({
  selector: 'app-properties-table',
  standalone: true,
  imports: [
    IonicModule,
    NgFor,
    NgIf
  ],
  templateUrl: './properties-table.component.html',
  styleUrls: ['./properties-table.component.scss'],
})
export class PropertiesTableComponent  implements OnInit {
  private propertyService = inject(PropertyService);
  @Input() itemList!: Property[];

  propertiesList = this.propertyService.getProperties();

  get hasFewProperties(): boolean {
    const properties = this.propertiesList();
    return properties && properties.length < 3;
  }

  constructor() { }

  ngOnInit() {}

}
