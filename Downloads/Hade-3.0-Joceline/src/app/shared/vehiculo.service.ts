import { Injectable } from '@angular/core';
import { VEHICULOS } from '../misvehiculos';
import { Vehiculos } from '../vehiculo';
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private vehiculos:Vehiculos[]=VEHICULOS;

  constructor() { }
  getVehiculo():Vehiculos[]{
    return this.vehiculos;
  }

  getUnVehiculo(posicion:number):Vehiculos{
    return this.vehiculos[posicion];
  }
  searchUnVehiculo(nomvehiculo:string):number{
    let index = this.vehiculos.findIndex(p=> p.marca === nomvehiculo);
    return index;
  }
}
