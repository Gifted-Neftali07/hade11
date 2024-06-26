
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService, Credential } from '../../../core/services/auth.service';
import { ButtonProviders } from '../components/button-providers/button-providers.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

interface LogInForm09{
 
  phoneNumber: FormControl<string>;
  otp: FormControl<string>;
}


@Component({
  selector: 'app-log',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatSnackBarModule,
    ButtonProviders,RouterModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent implements OnInit {
  hide = true;

  formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);
 // Define la propiedad 'data' para recibir los datos pasados al diálogo
 data: any;

 constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,public dialogRef: MatDialogRef<LogComponent>,) {
   // Asigna los datos recibidos a la propiedad 'data'
   this.data = dialogData;
 }
  form: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    
  });

  form09: FormGroup<LogInForm09> = this.formBuilder.group({
    phoneNumber: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    otp: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    this.authService.initializeRecaptchaVerifier('sign-in-button');
  }

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');
    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'This field is required'
        : 'Enter a valid email';
    }
    return false;
  }

  async logIn(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };

    try {
      await this.authService.logInWithEmailAndPassword(credential);
      //const snackBarRef = this.openSnackBar();
      this.openSnackBar('Inicio de sesión exitoso 😀', 'Cerrar');
      this.dialogRef.close(); // Cierra el diálogo después del inicio de sesión exitoso
     // this.router.navigateByUrl('/');
      /*snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });*/
    } catch (error) {
       // Manejar el error de contraseña incorrecta
    this.openSnackBar('La contraseña es incorrecta o el correo es incorrecto', 'Cerrar');
      console.error(error);
    }
  }

  onClickSendOTP(): void {
    const phoneNumber = this.form09.get('phoneNumber')?.value;
    if (!phoneNumber) {
      console.error('Phone number is required');
      return;
    }

    this.authService.loginWithPhoneNumber(phoneNumber)
      .then(() => {
        console.log('OTP sent to phone');
      })
      .catch((error: any) => console.error('Error during login with phone number', error));
  }

  onVerifyOTP(): void {
    const otp = this.form09.get('otp')?.value;
    if (!otp) {
      console.error('OTP is required');
      return;
    }

    this.authService.confirmPhoneNumber(otp)
      .then(() => {
        console.log('Phone number verified');
        this.openSnackBar('Número de teléfono verificado con éxito 😀', 'Cerrar');
        this.router.navigate(['/']);
      })
      .catch((error: any) =>// console.error('Error during OTP confirmation', error));
      {
        
        // Manejar el error de OTP incorrecto
        this.openSnackBar('El código OTP es incorrecto', 'Cerrar');
        
      });
  }

  /*openSnackBar() {
    return this._snackBar.open('Successfully logged in 😀', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }*/
    openSnackBar(message: string, action: string) {
      return this._snackBar.open(message, action, {
        duration: 2500,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }

}
