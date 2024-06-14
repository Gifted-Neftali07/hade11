import { Component } from '@angular/core';
import { Cliente } from '../listado-clientes/cliente.model';
import { ClientesService } from '../clientes.service';
@Component({
  selector: 'app-listado-des-clientes',
  standalone: true,
  imports: [],
  templateUrl: './listado-des-clientes.component.html',
  styleUrl: './listado-des-clientes.component.css'
})
export class ListadoDesClientesComponent {
  clientes!: Cliente[];
  constructor(private clientesService: ClientesService){  }

  ngOnInit(){
    this.clientes = this.clientesService.getClientesPosteriores();
  }
}