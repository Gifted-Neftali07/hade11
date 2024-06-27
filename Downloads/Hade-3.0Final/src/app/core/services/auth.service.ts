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
  ConfirmationResult,
  User
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
export interface Credential {
  email: string;
  password: string;
}

export interface UserData extends Credential {
  fullName: string;
  account: string;
  phone: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Ajusta esto según tu configuración
  
  private auth: Auth = inject(Auth);
  private reCaptchaVerifier: RecaptchaVerifier | undefined;
  private confirmationResult: ConfirmationResult | undefined;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  readonly authState$ = authState(this.auth);
  readonly isLoggedIn$ = this.loggedIn.asObservable();
  constructor( private angularFireAuth: Auth) {
  
    this.currentUser2 = new BehaviorSubject<User | null>(null);
    
  }

  private currentUser2: BehaviorSubject<User | null>;

  getCurrentUser2(uid: string): Promise<any> {
    return this.http.get(`${this.apiUrl}/users/${uid}`)
      .toPromise()
      .then((userData: any) => {
        this.currentUser2.next(userData);
        return userData;
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        throw error;
      });
  }

  getUser(): BehaviorSubject<User | null> {
    return this.currentUser2;
  }


  async signUpWithEmailAndPassword(userData: UserData): Promise<UserCredential> {
    try {
      const { email, password, fullName, account, phone } = userData;
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
  
      // Log para verificar datos antes de enviar al servidor
      console.log('Datos enviados al servidor:', {
       // uid: userCredential.user.uid,
       fullName, account, email, password, phone

      });
  
      // Enviar datos adicionales al servidor
      await this.sendUserDataToServer({
       fullName, account, email, password, phone
      });
   //   await this.send({})
      
      this.loggedIn.next(true);
      await this.getCurrentUser(); 
      return userCredential;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('El correo electrónico ya está en uso');
      }
      throw error;
    }
  }
  ////Manda los datos al endpoit post
  private sendUserDataToServer(userData: any): Promise<any> {
    return this.http.post('http://localhost:3000/register', userData)
      .toPromise()
      .then(response => {
        // Log para verificar la respuesta del servidor
        console.log('Respuesta del servidor:', response);
        return response;
      })
      .catch(error => {
        // Log para manejar errores en la comunicación con el servidor
        console.error('Error al enviar datos al servidor:', error);
        throw error;
      });
  }
  ///Obtiene los datos del end point get
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();



  async getCurrentUser() {
    const user = this.auth.currentUser;
    if (user && user.email) {
      try {
        const userDoc: any = await this.http.get(`${this.apiUrl}/byEmail/${user.email}`).toPromise();
        console.log('Datos del usuario obtenidos:', userDoc);

        if (userDoc && userDoc.cuenta) {
          this.currentUserSubject.next(userDoc);
          return userDoc;
        } else {
          console.error('Campo de cuenta no encontrado en los datos del usuario.');
          return null;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    }
    return null;
  }
  
  
 /* send(body: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, body);
  }*/
  

  async logInWithEmailAndPassword(credential: Credential): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
    this.loggedIn.next(true);
    await this.getCurrentUser(); 
  }

  async logOut(): Promise<void> {
    await signOut(this.auth);
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
  }

  // Providers
  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider);
  }

  signInWithGithubProvider(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();
    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.loggedIn.next(true);
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  // Phone Number Auth
  initializeRecaptchaVerifier(containerId: string): void {
    if (!this.reCaptchaVerifier) {
      this.reCaptchaVerifier = new RecaptchaVerifier(containerId, {
        'size': 'invisible',
        'callback': (response: string) => {
          // reCAPTCHA solved - allow user to proceed
        },
        'expired-callback': () => {
          // reCAPTCHA expired - ask user to solve reCAPTCHA again
        }
      }, this.auth);
    }
  }

  loginWithPhoneNumber(phoneNumber: string): Promise<ConfirmationResult> {
    if (!this.reCaptchaVerifier) {
      console.error('RecaptchaVerifier is not initialized');
      return Promise.reject('RecaptchaVerifier is not initialized');
    }

    return signInWithPhoneNumber(this.auth, phoneNumber, this.reCaptchaVerifier)
      .then(confirmationResult => {
        this.confirmationResult = confirmationResult;
        return confirmationResult;
      })
      .catch(error => {
        console.error('Error during signInWithPhoneNumber', error);
        throw error;
      });
  }

  confirmPhoneNumber(code: string): Promise<void> {
    if (!this.confirmationResult) {
      console.error('No confirmation result available');
      return Promise.reject('No confirmation result available');
    }

    return this.confirmationResult.confirm(code)
      .then(() => {
        console.log('Phone number confirmed successfully');
        this.loggedIn.next(true);
      })
      .catch(error => {
        console.error('Error confirming phone number', error);
        throw error;
      });
  }
}
