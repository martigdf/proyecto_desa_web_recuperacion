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
    await this.propertyService.fetchProperties();
    const userId = this.authService.getUserId().toString();
    const propertiesSignal = await this.propertyService.getPropertiesByDepartment(userId);
    this.properties = propertiesSignal();
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  openFilterMenu() {
    this.menu.open('filterMenu');
    console.log('Menu opened');
  }

}
