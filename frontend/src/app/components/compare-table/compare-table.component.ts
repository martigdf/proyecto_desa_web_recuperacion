import { Component, Input, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CompareItem } from '../../interfaces/compare-item';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-compare-table',
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, NgFor],
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss'],
})
export class CompareTableComponent {

  @Input() itemList! : CompareItem[];

  constructor() {}
}
