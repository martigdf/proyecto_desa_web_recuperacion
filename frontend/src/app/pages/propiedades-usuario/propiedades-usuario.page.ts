import { Component, OnInit, inject, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { Property } from '../../interfaces/property';
import { NgFor } from '@angular/common';
import { NewfilterPage} from '../../newfilter/newfilter.page'
import { PropertyService } from '../../services/property.service';
import { IonicModule, MenuController} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { filterOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-propiedades-usuario',
  standalone: true,
  imports: [
    PropertyCardComponent,
    NgFor,
    NewfilterPage,
    IonicModule
  ],
  templateUrl: './propiedades-usuario.page.html',
  styleUrls: ['./propiedades-usuario.page.scss'],
})
export class PropiedadesUsuarioPage  implements OnInit {

  private propertyService = inject(PropertyService);
  private router: Router = inject(Router);
  private menu: MenuController = inject(MenuController);
  private authService = inject(AuthService)
  private allProperties!: WritableSignal<Property[]>;
  properties!: Property[];

  constructor() {
    addIcons({ filterOutline});
  }

  async ngOnInit() {
    const userId = this.authService.getUserId().toString();
    this.propertyService.getPropertiesByDepartment(userId);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  openFilterMenu() {
    this.menu.open('filterMenu');
    console.log('Menu opened');
  }

  aplicarFiltros(filtros: any): void {
    // no tiene filtros aplicados, restaura todas las propiedades
    if (!filtros || Object.keys(filtros).every((key) => !filtros[key])) {
      this.properties = [...this.allProperties()];
      return;
    }

    const maxPriceLimit =
      filtros.maxPrice === 10000
        ? Math.max(...this.allProperties().map((p) => p.price))
        : filtros.maxPrice;
    this.properties = this.allProperties().filter((property) => {
      console.log('Valor del filtro de habitaciones:', filtros.habitaciones);
      console.log(
        'Número de habitaciones de la propiedad:',
        property.number_of_rooms
      );
      const cumplePrecio =
        (filtros.minPrice == null || property.price >= filtros.minPrice) &&
        (filtros.maxPrice == null || property.price <= maxPriceLimit);
        
      // Filtro de Departamento
      const cumpleDepartamento =
        !filtros.departamento || property.departamento === filtros.departamento;
      return (
        cumplePrecio &&
        cumpleDepartamento /*&& cumpleBarrio*/
      );
    });
  }
}
