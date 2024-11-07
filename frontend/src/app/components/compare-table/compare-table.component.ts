import { Component, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-compare-table',
  standalone: true,
  imports: [IonCol, IonRow, IonGrid],
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss'],
})
export class CompareTableComponent {
  constructor() {}
}
