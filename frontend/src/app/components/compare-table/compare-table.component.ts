import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonIcon,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { CompareItem } from '../../interfaces/compare-item';
import { NgFor } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { eye, trash } from 'ionicons/icons';

@Component({
  selector: 'app-compare-table',
  standalone: true,
  imports: [
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonList,
    IonIcon,
    IonButton,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    NgFor,
  ],
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss'],
})
export class CompareTableComponent {

  @Input() itemList!: CompareItem[];
  private propertyService = inject(PropertyService);
  private router = inject(Router);

  constructor() {
    addIcons({trash, eye})
  }

  removeProperty(item: CompareItem) {
      this.propertyService.removeFromCompare(item.property.id);
    }

  viewDetails(item: CompareItem) {
      this.router.navigate([`/property-view/${item.property.id}`])
    }
}
