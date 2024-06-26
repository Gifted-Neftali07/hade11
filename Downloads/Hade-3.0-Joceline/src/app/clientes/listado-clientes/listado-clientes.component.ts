import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from './cliente.model';
import { Clientes2Service } from 'src/app/core/services/clientes2.service';

@Component({
  selector: 'app-listado-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clientesService: Clientes2Service) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.clientesService.getClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      (error) => {
        console.error('Error al cargar clientes:', error);
      }
    );
  }

  editCliente(cliente: Cliente) {
    // Implementar lógica de edición (puede ser un modal o navegar a otra página)
    console.log('Editar cliente:', cliente);
  }

  deleteCliente(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.clientesService.deleteCliente(id).then(() => {
        this.loadClientes(); // Recargar la lista después de eliminar
      }).catch(error => {
        console.error('Error al eliminar cliente:', error);
      });
    }
  }
}