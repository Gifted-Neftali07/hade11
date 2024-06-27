import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Vehiculos } from '../vehiculo';
import { VehiculoService } from '../shared/vehiculo.service';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [RouterModule,CommonModule,MatSlideToggleModule,MatButtonToggleModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent {
  misVehiculos: Vehiculos[] = [];
  vehiculosOrdenados: Vehiculos[] = [];
  tipoFiltro: string = 'todos';
  criterioOrdenamiento: string = '';

  constructor(public miservicio: VehiculoService) {
    console.log("constructor de vehiculos");
  }

  ngOnInit(): void {
    console.log("ngOnInit de Vehiculos");
    this.misVehiculos = this.miservicio.getVehiculo();
    this.vehiculosOrdenados = [...this.misVehiculos]; // Hacer una copia de la lista original
    console.log(this.misVehiculos);
  }

  filtrarTipo(tipo: string) {
    this.tipoFiltro = tipo.toLowerCase();
    this.ordenarVehiculos(); // Ordenar los vehículos cada vez que se cambia el filtro
  }

  ordenarVehiculos() {
    // Filtrar primero por tipo
    let vehiculosFiltrados = this.misVehiculos.filter(v => this.tipoFiltro === 'todos' || v.tipo.toLowerCase() === this.tipoFiltro);

    // Luego ordenar basado en el criterio de ordenamiento
    switch (this.criterioOrdenamiento) {
      case 'precioAsc':
        this.vehiculosOrdenados = vehiculosFiltrados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precioDesc':
        this.vehiculosOrdenados = vehiculosFiltrados.sort((a, b) => b.precio - a.precio);
        break;
      case 'anoAsc':
        this.vehiculosOrdenados = vehiculosFiltrados.sort((a, b) => a.ano - b.ano);
        break;
      case 'anoDesc':
        this.vehiculosOrdenados = vehiculosFiltrados.sort((a, b) => b.ano - a.ano);
        break;
      default:
        this.vehiculosOrdenados = vehiculosFiltrados; // Si no hay criterio de ordenamiento, mostrar la lista filtrada sin ordenar
    }
  }

  establecerCriterioOrdenamiento(criterio: string) {
    this.criterioOrdenamiento = criterio;
    this.ordenarVehiculos(); // Ordenar los vehículos cada vez que se cambia el criterio de ordenamiento
  }



}
