import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from "../../layout/layout.component";

@Component({
  selector: 'app-property-view',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './property-view.page.html',
  styleUrl: './property-view.page.css'
})
export class PropertyViewPage {

  private router: Router = inject(Router);

  goToAllProperties() {
    this.router.navigate(['/all-properties']);
    
}
}
