import { Injectable, inject } from '@angular/core';
import {
  Auth,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class apiService {
  private apiUrl = 'http://localhost:3000'; // Ajusta esto según tu configuración
  
  private auth: Auth = inject(Auth);
  private reCaptchaVerifier: RecaptchaVerifier | undefined;
  private confirmationResult: ConfirmationResult | undefined;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);

  // Método para obtener los datos del QR
  getQrData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Qr`);
  }
}
