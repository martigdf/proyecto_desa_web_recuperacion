import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from "../../layout/layout.component";

@Component({
  selector: 'app-all-properties',
  standalone: true,
  imports: [LayoutComponent],
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
