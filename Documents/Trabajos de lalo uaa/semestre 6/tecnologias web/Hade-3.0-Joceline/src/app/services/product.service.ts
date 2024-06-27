import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlAPI:string="https://neftali.free.beeceptor.com/carros";
  constructor(private http: HttpClient) { }
  retornar(){
    return this.http.get(this.urlAPI).pipe(take(1));
  }
}
