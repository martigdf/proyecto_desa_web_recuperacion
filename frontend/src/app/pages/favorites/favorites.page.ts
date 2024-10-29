import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from "../../layout/layout.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './favorites.page.html',
  styleUrl: './favorites.page.css'
})
export class FavoritesPage {
  constructor(private router: Router) {}

  goToAllProperties() {
    this.router.navigate(['/all-properties']);
  }
  goToTask() {
    this.router.navigate(['/property-view'])
  }
}
