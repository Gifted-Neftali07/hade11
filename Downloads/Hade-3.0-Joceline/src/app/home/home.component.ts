import { Component } from '@angular/core';
import { DomseguroPipe } from './domseguro.pipe';
import { MasonryGalleryComponent } from '../masonry-gallery/masonry-gallery.component';
import { Router, RouterModule } from '@angular/router';
import { TextSelectionService } from '../shared/text-selection.service';
import { AccessibilityServiceService } from '../accessibility-service.service';
import { CommonModule } from '@angular/common';


import { QRCodeModule } from 'angularx-qrcode';

import { apiService } from '../core/services/api.service'; // Importa el servicio

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DomseguroPipe,MasonryGalleryComponent,RouterModule,CommonModule,QRCodeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'proyecto2';
  videoUrl: string = 'ARc5eZuBK2g?si=m6ZAIgOSax1uAegd'; // video insertado
  isLargeCursor: boolean = false;
  isDyslexicFont: boolean = false;

constructor(private router: Router,
  private accessibilityService: AccessibilityServiceService,
  public textSelectionService: TextSelectionService,
  private apiService: apiService
) {}

buscarUnVehiculo(nombre:string){
    this.router.navigate(['/buscador',nombre]);
  }

  toggleAccessibilityOptions() {
    this.accessibilityService.toggleHighlightLinks();
  }

  areLinksHighlighted(): boolean {
    return this.accessibilityService.areLinksHighlighted();
  }
  

  CambiaTipografica(): void {
    this.accessibilityService.toggleDyslexicFont();
    this.isDyslexicFont = this.accessibilityService.isDyslexicFontActive();
  }


  toggleGrayScale(): void {
    this.accessibilityService.toggleGrayScale();
  }
  ///VOZ
  isActive = false;

  handleTextSelection(event: MouseEvent) {
    if (!this.isActive) return;

    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      this.speakText(selectedText);
    }
  }

  speakText(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  toggleActiveState() {
    this.isActive = !this.isActive;
  }






  visibleQR = false;
  //errorCorrectionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  arrayPersonas: any[] = [];
  ngOnInit(): void {
    // Llama al método para obtener los datos del QR al inicializar el componente
    this.apiService.getQrData().subscribe(
      data => {
        this.arrayPersonas = data; // Asigna los datos obtenidos al arrayPersonas
        console.log(this.arrayPersonas);
      },
      error => {
        console.error('Error fetching QR data', error);
      }
    );
  }
  /*arrayPersonas = [
    { id: 0, name: 'Hannia Arcelia Plancarte Rivera', descripcion: 'Disfruta pasar los ratos libres jugando basquet' },
    { id: 1, name: 'Alondra Joceline Quezada Alfaro', descripcion: 'Le encanta disfrutar de la vida a lado de su novio' },
    { id: 2, name: 'Dulce', descripcion: 'Le encanta estudiar' },
    { id: 3, name: 'Shachiel', descripcion: 'Le encanta jugar videojuegos' },
    { id: 4, name: 'Neftali', descripcion: 'Le encanta disfrutar todo relacionado con redes' },
    { id: 5, name: 'Daniel', descripcion: 'Busca trabaja a cada rato' },
    { id: 6, name: 'Judith', descripcion: 'Le encanta jugar futbol' },
  ];*/

  generarQr() {
    const num = Math.floor(Math.random() * this.arrayPersonas.length);
    this.value = JSON.stringify(this.arrayPersonas[num]);
    this.visibleQR = true;
  }

}
