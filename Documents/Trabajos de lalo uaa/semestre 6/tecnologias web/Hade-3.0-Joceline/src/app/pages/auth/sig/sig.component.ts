import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Form
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

import { AuthService, UserData } from '../../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonProviders } from '../components/button-providers/button-providers.component';
import { LogComponent } from '../log/log.component';
import { MatDialog } from '@angular/material/dialog';
interface SignUpForm {
  fullName: FormControl<string>;
  account: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  phone: FormControl<string>;
}

@Component({
  selector: 'app-sig',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatSnackBarModule,
    ButtonProviders,],
  templateUrl: './sig.component.html',
  styleUrl: './sig.component.scss'
})
export class SigComponent {
  hide = true;

  formBuilder = inject(FormBuilder);

  form: FormGroup<SignUpForm> = this.formBuilder.group({
    fullName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    account: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    confirmPassword: this.formBuilder.control('', {
      validators: [Validators.required, this.matchPasswordValidator()],
      nonNullable: true,
    }),
    phone: this.formBuilder.control('', {  // Nuevo campo
      validators: [Validators.required, Validators.pattern('^[0-9]{10}$')],
      nonNullable: true,
    }),
  });

  private authService = inject(AuthService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

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

  getConfirmPasswordErrorMessage(): string {
    const control = this.form.get('confirmPassword');

    if (control?.hasError('required')) {
      return 'This field is required';
    } else if (control?.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }

    return '';
  }

  matchPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
  
      const password = control.parent.get('password');
      const confirmPassword = control;
  
      if (!password || !confirmPassword) {
        return null;
      }
  
      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    };
  }

  async signUp(): Promise<void> {
    if (this.form.invalid) return;
  
    const userData: UserData = {
      fullName: this.form.value.fullName || '',
      account: this.form.value.account || '',
      email: this.form.value.email || '',
      password: this.form.value.password || '',
      phone: this.form.value.phone || '',
    };
  
    try {
      await this.authService.signUpWithEmailAndPassword(userData);
  
      const snackBarRef = this.openSnackBar();
  
      snackBarRef.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/');
      });
    } catch (error) {
      console.error(error);
      // Maneja el error apropiadamente
    }
  }

  openSnackBar() {
    return this._snackBar.open('Succesfully Sign up 😀', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }


  constructor(public dialog: MatDialog) {}

  openLoginDialog(event: MouseEvent): void {
    event.preventDefault(); // Evita la navegación
    this.dialog.open(LogComponent, {
      width: '400px',
    });
  }

  
}
