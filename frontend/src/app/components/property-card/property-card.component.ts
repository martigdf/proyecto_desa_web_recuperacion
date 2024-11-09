import { Component, inject, Input} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Property } from '../../interfaces/property';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  @Input() property!: Property;
  private router = inject(Router);
  private propertyService = inject(PropertyService);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  constructor() {}

  addToCompareList(property: Property) {
    this.propertyService.addToCompare(property);
  }

  toggleFavorite() {
    if (this.authService.isValidUser()) {
      this.propertyService.addOrRemoveFavorite(this.property);
    } else {
      this.alertService.showError('No puedes añadir a favoritos. Debe iniciar sesión');
      this.router.navigate(['/login']);
    }
  }

  isFavorite(): boolean {
    return this.propertyService.isFavorite(this.property.id);
  }

  goToTask() {
    this.router.navigate([`/property-view/${this.property.id}`]);
  }
}
