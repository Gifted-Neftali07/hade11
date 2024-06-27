import { Component } from '@angular/core';
import { VehiculoService } from '../shared/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { UnvehiculoComponent } from '../unvehiculo/unvehiculo.component';
import { Vehiculos } from '../vehiculo';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [UnvehiculoComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  nombreh:string="";
  indice:number=0;
  
  mivehiculo: Vehiculos={
    marca:"",
    ano: 0,
    modelo:"",
    cantidad_personas: 0,
    cantidad_maletas: 0,
    aire_acondicionado: "", // Modificado de boolean a string
    mantenimiento: "",
    imagen: "",
    tipo: "",
    precio: 0,
  };
  constructor (private vehiculoService: VehiculoService, private activatedRoute: ActivatedRoute) {
  this.activatedRoute.params.subscribe(params =>{
  this.nombreh=params['nombreh'];
  this.indice=this.vehiculoService.searchUnVehiculo(this.nombreh);
  console.log(this.indice);
  if(this.indice != -1){
  this.mivehiculo=this.vehiculoService.getUnVehiculo(this.indice);
  }1
  });
  }
}
