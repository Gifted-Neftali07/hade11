import { Component } from '@angular/core';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  mensaje: string = '';

  constructor() { }

  onSubmit(): void {
    // Almacenar los valores en localStorage
    localStorage.setItem('nombre', this.nombre);
    localStorage.setItem('correo', this.correo);
    localStorage.setItem('telefono', this.telefono);
    localStorage.setItem('mensaje', this.mensaje);

    // Mostrar un mensaje de éxito
    alert('Mensaje enviado correctamente');

    // Restablecer los campos del formulario
    this.nombre = '';
    this.correo = '';
    this.telefono = '';
    this.mensaje = '';
  }

}
