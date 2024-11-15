import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { mailOutline, callOutline, locationOutline, albumsOutline, speedometerOutline, optionsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {

  private router : Router = inject(Router);

  constructor() {
    addIcons({mailOutline, callOutline, locationOutline, albumsOutline, speedometerOutline, optionsOutline})
  }

  Login() {
    this.router.navigate(['/login']);
  }

  Register() {
    this.router.navigate(['/register']);
  }

  View() {
    this.router.navigate(['/all-properties']);
  }
}
