import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-masonry-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './masonry-gallery.component.html',
  styleUrl: './masonry-gallery.component.css',
})
export class MasonryGalleryComponent {

  array:Product []= [];

  constructor(public productService: ProductService){
 
  }
  
  recuperarDatos():void{
   console.log("entre");
 
 this.productService.retornar().subscribe({
   next: this.successRequest.bind(this),
 
   error: (err) => {console.log(err)}
 });
 
  }
  successRequest(data:any):void{
   console.log("data",data);
   this.array = data.products;
   console.log("array",this.array);
  }
  images: any[] = [
    { likesCount: 0}, //bugatti
    { likesCount: 0 }, //bmw enfrente
    { likesCount: 0 }, //mercedes blanco viejo 
    { likesCount: 0 }, // BMW atras 
    { likesCount: 0 }, // lamborgini naranja
    { likesCount: 0 }, // carro azul
    { likesCount: 0 }, // JEEP
    { likesCount: 0 }, //PORSH AMARILLO
    {likesCount: 0 }, // FERRARI ROJO
    { likesCount: 0 } // CLASICO VIEJO
  ];

  ngOnInit() {
    console.log("En este instante el componente ha cargado");
   this.recuperarDatos();
    // Al iniciar, carga los likes de cada imagen desde el LocalStorage
    for (let image of this.images) {
      image.likesCount = this.getLikesCount(image.url);
    }
  }

  incrementLikesCount(index: number) {
    // Incrementa el número de likes para la imagen específica
    this.array[index].likesCount += 1;

    // Guarda el nuevo número de likes en el LocalStorage
    localStorage.setItem(this.array[index].url, this.array[index].likesCount.toString());
  }

  getLikesCount(imageUrl: string): number {
    const likes = localStorage.getItem(imageUrl);
    return likes ? parseInt(likes) : 0;
  }
  
}

