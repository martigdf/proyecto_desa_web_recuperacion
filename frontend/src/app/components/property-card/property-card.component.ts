import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Property } from '../../interfaces/property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, ],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  @Input() property!: Property;
  private router = inject(Router);
  constructor() {}

  goToTask() {
    this.router.navigate([`/property-view/${this.property.id}`])
  }

}
