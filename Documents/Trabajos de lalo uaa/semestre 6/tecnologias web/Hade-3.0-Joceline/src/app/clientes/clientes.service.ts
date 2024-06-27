import { Injectable } from '@angular/core';
import {Cliente} from './listado-clientes/cliente.model';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientes!: Cliente[];


  constructor() {
     this.clientes=JSON.parse(localStorage.getItem("data") || '[]');
  }


  
  getClientes(){
    return this.clientes;
  }
  agregarCliente(cliente:Cliente){
    this.clientes.push(cliente);
    localStorage.setItem('data',JSON.stringify(this.clientes));
  }

  
  getClientesAnteriores(): Cliente[] {
    const fechaActual = new Date();
    return this.clientes.filter(cliente => {
      const fechaRenta = new Date(cliente.fechaCompra);
      return fechaRenta < fechaActual;
    });
  }

  getClientesPosteriores(): Cliente[] {
    const fechaActual = new Date();
    return this.clientes.filter(cliente => {
      const fechaRenta = new Date(cliente.fechaCompra);
      return fechaRenta > fechaActual;
    });
  }

  
  nuevoCliente(): Cliente {
    return{
  
      fechaCompra: '',
      horaCompra: '',
      fechaDevolucion: '',
      horaDevolucion:'',
      nombre: '',
      correo: '',
      precio: 0,
      tipoVehiculo: '',
      anio: 0,
      marca: '',
    };
  }
}
