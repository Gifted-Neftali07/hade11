import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VehiculoService } from '../shared/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { Vehiculos } from '../vehiculo';
import { UnvehiculoComponent } from '../unvehiculo/unvehiculo.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClientesService } from '../clientes/clientes.service';
import { Cliente } from '../clientes/listado-clientes/cliente.model';
@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [RouterModule, UnvehiculoComponent,FormsModule],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.css'
})
export class ReservarComponent {
  @Input() vehiculo!:Vehiculos;
  cliente!: Cliente;
  constructor(public vehiculoService:VehiculoService, public activatedRoute: ActivatedRoute,private clientesService: ClientesService){
    this.activatedRoute.params.subscribe(params => {
      this.vehiculo=vehiculoService.getUnVehiculo(params['id']);
    })
  }
  ////Nuevo
  ngOnInit(){
    this.cliente = this.clientesService.nuevoCliente();
  }
  nuevoCliente(): void {
   // Convertir las fechas a objetos Date
  const fechaRenta = new Date(this.cliente.fechaCompra);
  const fechaDevolucion = new Date(this.cliente.fechaDevolucion);

  // Calcular la diferencia en días
  const diferenciaTiempo = fechaDevolucion.getTime() - fechaRenta.getTime();
  const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));

  // Calcular el precio total basado en la cantidad de días y el precio por día
  const precioTotal = diferenciaDias * this.vehiculo.precio;

  // Asignar el precio total al precio del cliente
  this.cliente.precio = precioTotal;
 this.cliente.anio = this.vehiculo.ano;
 this.cliente.tipoVehiculo = this.vehiculo.tipo
  // ... resto de la lógica para agregar el cliente ...
  
  // Verificar si la fecha y hora ya están ocupadas
  const clientes = this.clientesService.getClientes();
  const fechaHoraNueva = new Date(this.cliente.fechaCompra + 'T' + this.cliente.horaCompra);
  const fechaHoraExistente = clientes.some(cliente =>
    new Date(cliente.fechaCompra + 'T' + cliente.horaCompra).getTime() === fechaHoraNueva.getTime());

  if (fechaHoraExistente) {
    Swal.fire('La fecha y hora seleccionadas ya están ocupadas.', ':(');
    return;
  }

  // Verificar si la fecha es anterior a la fecha actual
  const fechaActual = new Date();
  if (fechaRenta < fechaActual) {
    Swal.fire('No puedes seleccionar una fecha anterior a la fecha actual.', ':(');
    return;
  }
    // Si pasa todas las validaciones, agregar el cliente
    this.clientesService.agregarCliente(this.cliente);
    this.ngOnInit;
      Swal.fire("Cliente guardado exitosamente");
}


}


