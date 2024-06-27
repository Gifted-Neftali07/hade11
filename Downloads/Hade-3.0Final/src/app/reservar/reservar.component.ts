import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule aquí
import { RouterModule } from '@angular/router';
import { VehiculoService } from '../shared/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { Vehiculos } from '../vehiculo';
import { UnvehiculoComponent } from '../unvehiculo/unvehiculo.component';
import { ClientesService } from '../clientes/clientes.service';
import { Cliente } from '../clientes/listado-clientes/cliente.model';
import { Clientes2Service } from 'src/app/core/services/clientes2.service';
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [
    RouterModule,
    UnvehiculoComponent,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule // Asegúrate de importar ReactiveFormsModule aquí
  ],
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  @Input() vehiculo!: Vehiculos;
  clienteForm!: FormGroup;
  currentUser$: Observable<any>;
  user: any; // Define el tipo de 'user' según los datos que obtengas

  constructor(
    public vehiculoService: VehiculoService,
    public activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private clientes2Service: Clientes2Service,
    private authService: AuthService,
    private fb: FormBuilder,
    private http: HttpClient // Add HttpClient here
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.vehiculo = vehiculoService.getUnVehiculo(params['id']);
    }),
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      fechaCompra: ['', Validators.required],
      horaCompra: ['', Validators.required],
      fechaDevolucion: ['', Validators.required],
      horaDevolucion: ['', Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      correo: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      precio: [{ value: '', disabled: true }, Validators.required],
      tipoVehiculo: [{ value: '', disabled: true }, Validators.required],
      anio: [{ value: '', disabled: true }, Validators.required],
      marca: [{ value: '', disabled: true }, Validators.required],
    });

    this.authService.currentUser$.subscribe(user => {
      this.user = user; // Asigna el usuario actual al objeto 'user'
      this.clienteForm.patchValue({
        nombre: this.user.NombreCompleto, // Asigna el nombre completo del usuario autenticado al objeto cliente
        correo: this.user.DireccionCorreo // Asigna el correo electrónico del usuario autenticado al objeto cliente
      });
    });
  }

  nuevoCliente(): void {
    if (this.clienteForm.valid) {
      const formValue = this.clienteForm.getRawValue();
      const fechaRenta = new Date(formValue.fechaCompra);
      const fechaDevolucion = new Date(formValue.fechaDevolucion);
      const diferenciaTiempo = fechaDevolucion.getTime() - fechaRenta.getTime();
      const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
      const precioTotal = diferenciaDias * this.vehiculo.precio;

      const cliente: Cliente = {
        ...formValue,
        precio: precioTotal,
        anio: this.vehiculo.ano,
        tipoVehiculo: this.vehiculo.tipo,
        marca: this.vehiculo.marca
      };

      if (this.validarFechaHora(cliente)) {
        this.clientes2Service.createCliente(cliente)
          .then(() => {
            Swal.fire('Éxito', 'Cliente guardado correctamente en Firebase', 'success');
            this.limpiarFormulario();
          })
          .catch((error: any) => {
            Swal.fire('Error', 'No se pudo guardar el cliente en Firebase', 'error');
          });

        this.http.post('http://localhost:3000/cita', cliente)
          .subscribe(
            (response: any) => {
              Swal.fire('Éxito', 'Cliente guardado correctamente en el servidor', 'success');
              this.limpiarFormulario();
            },
            (error: any) => {
              Swal.fire('Error', 'No se pudo guardar el cliente en el servidor', 'error');
            }
          );

        this.http.post('http://localhost:3000/citasnuevas', cliente)
          .subscribe(
            (response: any) => {
              Swal.fire('Éxito', 'Cliente guardado correctamente en el servidor', 'success');
              this.limpiarFormulario();
            },
            (error: any) => {
              Swal.fire('Error', 'No se pudo guardar el cliente en el servidor', 'error');
            }
          );
      }
    }
  }

  validarFechaHora(cliente: Cliente): boolean {
    const fechaHoraNueva = new Date(cliente.fechaCompra + 'T' + cliente.horaCompra);
    const fechaActual = new Date();

    if (fechaHoraNueva < fechaActual) {
      Swal.fire('Error', 'No puedes seleccionar una fecha y hora anterior a la actual', 'error');
      return false;
    }

    return true;
  }

  limpiarFormulario(): void {
    this.clienteForm.reset();
    this.clienteForm.patchValue({
      nombre: this.user.NombreCompleto,
      correo: this.user.DireccionCorreo
    });
  }
}
