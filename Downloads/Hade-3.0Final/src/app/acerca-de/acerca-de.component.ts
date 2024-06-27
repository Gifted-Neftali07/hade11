import { Component } from '@angular/core';
import { CreditosComponent } from '../creditos/creditos.component';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [CreditosComponent],
  templateUrl: './acerca-de.component.html',
  styleUrl: './acerca-de.component.css'
})
export class AcercaDeComponent {

}
