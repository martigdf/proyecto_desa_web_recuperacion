import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonIcon,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, person, cog } from 'ionicons/icons';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [IonRow, IonCol, IonGrid, IonButton, IonIcon],
  templateUrl: './admin-panel.page.html',
  styleUrl: './admin-panel.page.css',
})
export class AdminPanelPage {
  private router: Router = inject(Router);

  constructor() {
    addIcons({ person, home, cog });
  }

  goToUserList() {
    this.router.navigate(['admin-panel', 'users']);
  }
  goToPropertyList() {
    this.router.navigate(['/all-properties']);
  }
  goToPropertyListAdmin() {
    this.router.navigate(['admin-panel', 'properties']);
  }
}
