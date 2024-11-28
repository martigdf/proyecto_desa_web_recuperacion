import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [IonicModule,
    ReactiveFormsModule, 
    NgFor, 
  ],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent  implements OnInit {

  @Output() filtrosAplicados = new EventEmitter<any>();
  filtrosForm: FormGroup;
  
  departamentos = ['Salto', 'Montevideo', 'Durazno', 'Maldonado', 'Canelones', 'Rocha', 'Colonia', 'Paysandú', 'Artigas', 'Rivera', 'Tacuarembó', 'Lavalleja', 'Treinta y Tres', 'Florida', 'San José', 'Soriano', 'Flores', 'Cerro Largo'];
  habitaciones = ['1', '2', '3', '4', '5+'];

  constructor(private fb: FormBuilder) {
    this.filtrosForm = this.fb.group({
      minPrice: [20000],
      maxPrice: [300000],
      precioMin: [''],
      precioMax: [''],
      habitaciones: [''],
      departamento: [''],
      barrio: ['']
    });
  }

  ngOnInit(): void {
    // Emite cada vez que cambian los valores del formulario
    this.filtrosForm.valueChanges.subscribe((filtros) => {
      this.filtrosAplicados.emit(filtros);
    });
  }

  // Actualiza el valor de habitaciones en el formulario
  updatePriceRange(event: any): void {
    const { lower, upper } = event.detail.value;
    this.filtrosForm.patchValue({
      minPrice: lower,
      maxPrice: upper
    });
  }


  // Para que el formulario se resetee
  resetFilters() {
    this.filtrosForm.reset({
      habitaciones: '',
      price: 0,
      departamento: '',
      barrio: ''
    });

    this.filtrosAplicados.emit({});
  }
}
