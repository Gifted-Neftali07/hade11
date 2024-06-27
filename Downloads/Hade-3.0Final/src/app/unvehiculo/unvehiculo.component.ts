import { Component,Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VehiculoService } from '../shared/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { Vehiculos } from '../vehiculo';

@Component({
  selector: 'app-unvehiculo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './unvehiculo.component.html',
  styleUrl: './unvehiculo.component.css'
})
export class UnvehiculoComponent {

  @Input() vehiculo!:Vehiculos;
  constructor(public vehiculoService:VehiculoService, public activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(params => {
      this.vehiculo=vehiculoService.getUnVehiculo(params['id']);
    })
  }
}
