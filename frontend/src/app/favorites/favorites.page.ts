import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.page.html',
  styleUrl: './favorites.page.css'
})
export class FavoritesPage {
  constructor(private router: Router) {}

  goToAllProperties() {
    this.router.navigate(['/all-properties']);
  }
}
