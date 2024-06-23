import { Component, OnInit } from '@angular/core';
import { HijoComponent } from "../hijo/hijo.component";

@Component({
    selector: 'app-padre',
    standalone: true,
    templateUrl: './padre.component.html',
    styleUrl: './padre.component.css',
    imports: [HijoComponent]
})
export class PadreComponent implements OnInit {

  pasarDatosHijo: string = 'Universidad Autonoma de Aguascalientes';
  // obtenerDatosHijo: string ='';

  pasarDatosPa: string ='';

  constructor(){

  }

  ngOnInit(): void {
      
  }

  obtenerDatosHijo(event: string){
 this.pasarDatosPa = event;


  }

}
