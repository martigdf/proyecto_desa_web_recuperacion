import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { NgIf } from '@angular/common';
import { CompareTableComponent } from '../../components/compare-table/compare-table.component';

@Component({
  selector: 'app-property-compare',
  standalone: true,
  imports: [NgIf, CompareTableComponent],
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
