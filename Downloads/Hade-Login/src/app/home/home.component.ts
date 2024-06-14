import { Component } from '@angular/core';
import { DomseguroPipe } from './domseguro.pipe';
import { MasonryGalleryComponent } from '../masonry-gallery/masonry-gallery.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DomseguroPipe,MasonryGalleryComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'proyecto2';
  videoUrl: string = 'ARc5eZuBK2g?si=m6ZAIgOSax1uAegd'; // video insertado

}
