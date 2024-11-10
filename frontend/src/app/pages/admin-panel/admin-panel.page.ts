import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, person } from 'ionicons/icons';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [IonIcon, LayoutComponent],
  templateUrl: './admin-panel.page.html',
  styleUrl: './admin-panel.page.css',
})
export class AdminPanelPage {
  private router: Router = inject(Router);

  constructor() {
    addIcons({ person, home });
  }

  goToUserList() {
    this.router.navigate(['admin-panel', 'users']);
  }
  goToPropertyList() {
    this.router.navigate(['/all-properties']);
  }
}
