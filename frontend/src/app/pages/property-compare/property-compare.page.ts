import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-compare',
  standalone: true,
  imports: [],
  templateUrl: './property-compare.page.html',
  styleUrl: './property-compare.page.css',
})
export class PropertyComparePage {
  private router: Router = inject(Router);

  goToAllProperties() {
    this.router.navigate(['/all-properties']);
  }
}
