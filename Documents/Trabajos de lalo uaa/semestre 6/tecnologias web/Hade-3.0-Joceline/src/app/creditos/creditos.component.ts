import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PadreComponent } from '../padre/padre.component';

@Component({
  selector: 'app-creditos',
  standalone: true,
  imports: [RouterOutlet, PadreComponent],
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.css'
})
export class CreditosComponent {

}
