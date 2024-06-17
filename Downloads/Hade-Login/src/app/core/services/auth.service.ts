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

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private reCaptchaVerifier: RecaptchaVerifier | undefined;
  private confirmationResult: ConfirmationResult | undefined;
  private loggedIn = new BehaviorSubject<boolean>(false);

  readonly authState$ = authState(this.auth);
  readonly isLoggedIn$ = this.loggedIn.asObservable();

  // Email and Password Auth
  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    console.log('Attempting to log in with:', credential);
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  async logInWithEmailAndPassword(credential: Credential): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
    this.loggedIn.next(true);
  }

  async logOut(): Promise<void> {
    await signOut(this.auth);
    this.loggedIn.next(false);
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
