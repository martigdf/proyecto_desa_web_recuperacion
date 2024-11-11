import { Component, OnInit, inject } from '@angular/core';
import { LayoutComponent } from '../../layout/layout.component';
import { IonicModule } from '@ionic/angular';
import { PropertyService } from '../../services/property.service';
import { PropertiesTableComponent } from "../../components/properties-table/properties-table.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [LayoutComponent, 
    IonicModule, 
    PropertiesTableComponent, 
    NgIf],
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage  implements OnInit {

  private propertyService = inject(PropertyService);

  propertiesList = this.propertyService.getProperties();

  constructor() { }

  ngOnInit() {}

}
