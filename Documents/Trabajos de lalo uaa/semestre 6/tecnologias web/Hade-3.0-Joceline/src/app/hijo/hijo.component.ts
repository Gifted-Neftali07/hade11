import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent implements OnInit {

  @Input() obtenerDatosPadre: string = '';
  @Output() pasarDatosPadre = new  EventEmitter<string>();

  constructor(){

  }

  ngOnInit(): void {
      this.pasarDatosPadre.emit("Este proyecto fue realizado con el fin de poner en práctica los conocimientos adquiridos durante el parcial. Se trata de un trabajo universitario en equipo, desarrollado con el objetivo de aplicar los conceptos aprendidos en el parcial y consolidar nuestra comprensión de Tecnologias Web. A través de esta experiencia colaborativa, hemos fortalecido nuestras habilidades técnicas, así como nuestra capacidad para trabajar en conjunto para alcanzar objetivos comunes. Cada miembro del equipo ha contribuido con su creatividad, conocimientos y esfuerzo para llevar a cabo este proyecto. Agradecemos a nuestra profesora por brindarnos la oportunidad de participar en esta experiencia de aprendizaje práctico, así como a nuestros compañeros de equipo por su dedicación y colaboración en cada etapa del proceso. Esperamos que este proyecto no solo demuestre nuestro compromiso con la excelencia académica, sino también nuestro entusiasmo por aprender y aplicar nuevos conceptos en el campo de la programacion.");
  }

}
