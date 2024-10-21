import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-properties',
  standalone: true,
  imports: [],
  templateUrl: './all-properties.page.html',
  styleUrl: './all-properties.page.css',
})
export class AllPropertiesPage {
  constructor() {}

  private router: Router = inject(Router);

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }
  goToTask() {
    this.router.navigate(['/property-view'])
  }
  goToCompare() {
    this.router.navigate(['/property-compare'])
  }
}
