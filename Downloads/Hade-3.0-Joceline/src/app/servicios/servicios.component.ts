import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  tablaClases = 'table table-striped';

  estiloIcono = {
    'text-align': 'center',
    'line-height': '50px', // Ajusta esto según la altura real de la celda
    'padding': '10px'
  };
  
  

  textoTabla = {
    'text-align': 'center'
  }
}
