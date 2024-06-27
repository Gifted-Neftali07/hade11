import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Importación del módulo
import { HttpClientModule } from '@angular/common/http'; // Importación del módulo
import { CommonModule, NgClass } from '@angular/common'; // Importar NgClass
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgClass,CommonModule], // Agregar NgClass aquí
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required], 
      mensaje: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Enviando datos del formulario:', this.contactForm.value);
      
      // Crear dos observables para las llamadas a las APIs
      const contactoRequest = this.http.post('http://localhost:3000/contacto', this.contactForm.value);
      const contacto2Request = this.http.post('http://localhost:3000/contacto2', this.contactForm.value);
  
      // Usar forkJoin para hacer ambas llamadas en paralelo
      forkJoin([contactoRequest, contacto2Request]).subscribe(
        ([contactoResponse, contacto2Response]) => {
          console.log('Respuesta de contacto:', contactoResponse);
          console.log('Respuesta de contacto2:', contacto2Response);
          alert('Recibimos su comentario, se atenderá lo antes posible');
          this.contactForm.reset();
        },
        error => {
          console.error('Error del servidor:', error);
          alert('Hubo un error al enviar su comentario. Por favor, intente de nuevo.');
        }
      );
    }
  }
}

