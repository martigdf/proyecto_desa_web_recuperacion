import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PropertyService } from '../../services/property.service';
import { NgFor, NgIf } from '@angular/common';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { CompareTableComponent } from "../../components/compare-table/compare-table.component";

@Component({
  selector: 'app-property-compare',
  standalone: true,
  imports: [
    LayoutComponent,
    NgIf,
    CompareTableComponent
],
  templateUrl: './property-compare.page.html',
  styleUrl: './property-compare.page.css',
})
export class PropertyComparePage {
  private router: Router = inject(Router);
  private propertyService = inject(PropertyService);

  compareList = this.propertyService.getCompareList();

  goToAllProperties() {
    this.router.navigate(['/all-properties']);
  }
}
