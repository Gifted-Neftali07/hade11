import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pipe',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.scss'
})
export class PipeComponent {
  fechaActual = new Date();
  cotizacionUSD = 19.50;
  cotizacionEUR = 23.10;
  citaInspiradora = ' ';
  
    vehiculo = {
    equipamientoSeguridad: ['Airbags', 'Frenos ABS', 'Control de tracción'],
    confort: ['Aire acondicionado', 'Asientos de cuero'],
    tecnologia: ['GPS', 'Bluetooth', 'Cámara de reversa'],
    extras: ['Portaequipajes', 'Silla para bebé', 'Soporte para bicicletas'],
    
      requisitos: {
      edadMinima: 21,
      licencia: 'Licencia de conducir válida',
      tarjetaCredito: true
    },
  };

    actualizarDatos() {
    this.citaInspiradora = 'Tu viaje, nuestro compromiso. Alquila el auto perfecto para tu próxima aventura. - HADE';
  }
  
    ngOnInit() {
    this.actualizarDatos();
  }
}
