import { Component, OnInit } from '@angular/core';
import { Cliente } from '../listado-clientes/cliente.model';
import { Clientes2Service } from 'src/app/core/services/clientes2.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-des-clientes',
  standalone: true,
  imports: [],
  templateUrl: './listado-des-clientes.component.html',
  styleUrl: './listado-des-clientes.component.css'
})
export class ListadoDesClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  currentUser$: Observable<any>;
  user: any;

  constructor(
    private clientesService: Clientes2Service,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (this.user && this.user.DireccionCorreo) {
        this.loadClientesByEmail(this.user.DireccionCorreo);
      }
    });
  }

  loadClientesByEmail(email: string) {
    this.clientesService.getCitasByEmail(email).subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      (error) => {
        console.error('Error al cargar citas:', error);
      }
    );
  }

  deleteCliente(id: string | undefined) {
    if (!id) {
      console.error('ID de cliente no válido');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
      this.clientesService.deleteCliente(id).then(() => {
        console.log('Cita eliminada con éxito');
        // Recargar las citas después de eliminar
        if (this.user && this.user.DireccionCorreo) {
          this.loadClientesByEmail(this.user.DireccionCorreo);
        }
      }).catch(error => {
        console.error('Error al eliminar la cita:', error);
      });
    }
  }
}