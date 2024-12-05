import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-newfilter',
  standalone: true,
  imports: [IonicModule,
    ReactiveFormsModule, 
    NgFor, 
  ],
  templateUrl: './newfilter.page.html',
  styleUrls: ['./newfilter.page.scss'],
})
export class NewfilterPage  implements OnInit {


  @Output() filtrosAplicados = new EventEmitter<any>();
  filtrosForm: FormGroup;

  departamentos = ['Salto', 'Montevideo', 'Durazno', 'Maldonado', 'Canelones', 'Rocha', 'Colonia', 'Paysandú', 'Artigas', 'Rivera', 'Tacuarembó', 'Lavalleja', 'Treinta y Tres', 'Florida', 'San José', 'Soriano', 'Flores', 'Cerro Largo'];

  constructor(private fb: FormBuilder) {
    this.filtrosForm = this.fb.group({
      minPrice: [20000],
      maxPrice: [300000],
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
