import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../listado-clientes/cliente.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alta-cliente',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './alta-cliente.component.html',
  styleUrl: './alta-cliente.component.css'
})
export class AltaClienteComponent {
  cliente!: Cliente;
  constructor(private clientesService: ClientesService){}
 
   
  
  
    ngOnInit(){

      this.cliente = this.clientesService.nuevoCliente();
     
    }
  //  nuevoCliente():void{
    //  this.clientesService.agregarCliente(this.cliente);
      //this.cliente = this.clientesService.nuevoCliente();
    
   // }

    nuevoCliente(): void {
      // Obtener todos los clientes
      const clientes = this.clientesService.getClientes();
      
      // Verificar si la fecha y hora ya están ocupadas
      const fechaHoraNueva = new Date(this.cliente.fechaCompra + 'T' + this.cliente.horaCompra);
      const fechaHoraExistente = clientes.some(cliente =>
        new Date(cliente.fechaCompra + 'T' + cliente.horaCompra).getTime() === fechaHoraNueva.getTime());
  
      if (fechaHoraExistente) {

       // Swal.fire('La fecha y hora seleccionadas ya están ocupadas.');
       Swal.fire('La fecha y hora seleccionadas ya están ocupadas.', ':(')
        return;
      }
  
      // Verificar si la fecha es anterior a la fecha actual
      const fechaActual = new Date();
      const fechaSeleccionada = new Date(this.cliente.fechaCompra);
      if (fechaSeleccionada < fechaActual) {
       
        
        Swal.fire('No puedes seleccionar una fecha anterior a la fecha actual.', ':(')
        return;
      }
  
      // Si pasa todas las validaciones, agregar el cliente
      this.clientesService.agregarCliente(this.cliente);
 
    
      

}
}
