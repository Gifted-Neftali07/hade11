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

import { Clientes2Service } from 'src/app/core/services/clientes2.service'; // Ajusta la ruta según tu estructura de carpetas
import { AuthService } from '../core/services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Importación del módulo
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [RouterModule, UnvehiculoComponent,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.css'
})
export class ReservarComponent {
  @Input() vehiculo!:Vehiculos;
  cliente: Cliente = {
    fechaCompra: '',
    horaCompra: '',
    fechaDevolucion: '',
    horaDevolucion: '',
    nombre: '',
    correo: '',
    precio: 0,
    tipoVehiculo: '',
    anio: 0,
    marca: ''
  };
  currentUser$: Observable<any>;
  user: any; // Define el tipo de 'user' según los datos que obtengas
 
  constructor(public vehiculoService:VehiculoService, public activatedRoute: ActivatedRoute,private clientesService: ClientesService,private clientes2Service: Clientes2Service,private authService: AuthService,private fb: FormBuilder, private http: HttpClient){
    this.activatedRoute.params.subscribe(params => {
      this.vehiculo=vehiculoService.getUnVehiculo(params['id']);
    }),
    this.currentUser$ = this.authService.currentUser$;
  }
  ////Nuevo
  ngOnInit(){
   // this.cliente = this.clientesService.nuevoCliente();
   this.authService.currentUser$.subscribe(user => {
    this.user = user; // Asigna el usuario actual al objeto 'user'
    this.cliente.nombre = this.user.NombreCompleto; // Asigna el nombre completo del usuario autenticado al objeto cliente
    this.cliente.correo = this.user.DireccionCorreo; // Asigna el correo electrónico del usuario autenticado al objeto cliente
    console.log(this.user);
  });
  }
  nuevoCliente(): void {
    console.log('Función nuevoCliente() llamada');
    console.log('Cliente actual:', this.cliente);
  
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
    this.cliente.tipoVehiculo = this.vehiculo.tipo;
    this.cliente.marca = this.vehiculo.marca;
  
    // Validar fecha y hora
    if (this.validarFechaHora()) {
      // Guardar en Firebase (ejemplo)
      this.clientes2Service.createCliente(this.cliente)
        .then(() => {
          console.log('Cliente guardado exitosamente en Firebase');
          Swal.fire('Éxito', 'Cliente guardado correctamente en Firebase', 'success');
          this.limpiarFormulario();
        })
        .catch((error) => {
          console.error('Error al guardar el cliente en Firebase:', error);
          Swal.fire('Error', 'No se pudo guardar el cliente en Firebase', 'error');
        });
  
      // Enviar al endpoint /cita en el servidor Node.js
      this.http.post('http://localhost:3000/cita', {
        fechaCompra: this.cliente.fechaCompra,
        horaCompra: this.cliente.horaCompra,
        fechaDevolucion: this.cliente.fechaDevolucion,
        horaDevolucion: this.cliente.horaDevolucion,
        nombre: this.cliente.nombre,
        correo: this.cliente.correo,
        precio: this.cliente.precio,
        tipoVehiculo: this.cliente.tipoVehiculo,
        anio: this.cliente.anio,
        marca: this.cliente.marca
      })
      .subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          // Aquí puedes manejar la respuesta del servidor según lo necesites
          Swal.fire('Éxito', 'Cliente guardado correctamente en el servidor', 'success');
          this.limpiarFormulario();
        },
        (error) => {
          console.error('Error al guardar el cliente en el servidor:', error);
          Swal.fire('Error', 'No se pudo guardar el cliente en el servidor', 'error');
        }
      );

       // Enviar al endpoint /cita en el servidor Node.js
       this.http.post('http://localhost:3000/citasnuevas', {
        fechaCompra: this.cliente.fechaCompra,
        horaCompra: this.cliente.horaCompra,
        fechaDevolucion: this.cliente.fechaDevolucion,
        horaDevolucion: this.cliente.horaDevolucion,
        nombre: this.cliente.nombre,
        correo: this.cliente.correo,
        precio: this.cliente.precio,
        tipoVehiculo: this.cliente.tipoVehiculo,
        anio: this.cliente.anio,
        marca: this.cliente.marca
      })
      .subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          // Aquí puedes manejar la respuesta del servidor según lo necesites
          Swal.fire('Éxito', 'Cliente guardado correctamente en el servidor', 'success');
          this.limpiarFormulario();
        },
        (error) => {
          console.error('Error al guardar el cliente en el servidor:', error);
          Swal.fire('Error', 'No se pudo guardar el cliente en el servidor', 'error');
        }
      );
    }
  }
  
  validarFechaHora(): boolean {
    const fechaHoraNueva = new Date(this.cliente.fechaCompra + 'T' + this.cliente.horaCompra);
    const fechaActual = new Date();
  
    if (fechaHoraNueva < fechaActual) {
      Swal.fire('Error', 'No puedes seleccionar una fecha y hora anterior a la actual', 'error');
      return false;
    }
  
    // Aquí puedes añadir más validaciones si es necesario
  
    return true;
  }
  limpiarFormulario(): void {
    this.cliente = {
      fechaCompra: '',
      horaCompra: '',
      fechaDevolucion: '',
      horaDevolucion: '',
      nombre: '',
      correo: '',
      precio: 0,
      tipoVehiculo: '',
      anio: 0,
      marca: ''
    };
  }

}


