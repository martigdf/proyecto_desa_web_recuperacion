import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { Property } from '../../interfaces/property';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  @Input() property!: Property;
  private router = inject(Router);
  private propertyService = inject(PropertyService);
  constructor() {}

  addToCompareList(property: Property) {
    this.propertyService.addToCompare(property);
  }

  goToTask() {
    this.router.navigate([`/property-view/${this.property.id}`]);
  }
}
