import { Component } from '@angular/core';
import { DomseguroPipe } from './domseguro.pipe';
import { MasonryGalleryComponent } from '../masonry-gallery/masonry-gallery.component';
import { Router, RouterModule } from '@angular/router';
import { TextSelectionService } from '../shared/text-selection.service';
import { AccessibilityServiceService } from '../accessibility-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DomseguroPipe,MasonryGalleryComponent,RouterModule,CommonModule],
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
  public textSelectionService: TextSelectionService
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
}
