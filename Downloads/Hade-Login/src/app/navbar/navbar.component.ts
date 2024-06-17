import { Router, RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { LogComponent } from '../pages/auth/log/log.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    LogComponent,
    MatDialogModule,
    CommonModule // Añade CommonModule a los imports
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  openLoginDialog(): void {
    // Pasamos la referencia del diálogo como dato dentro del objeto de configuración
    const dialogRef = this.dialog.open(LogComponent, {
      width: '400px',
      data: { dialogRef: null } // Inicializamos con null
    });
  
    // Ahora asignamos la referencia del diálogo a la propiedad 'dialogRef' en 'data'
    dialogRef.componentInstance.data.dialogRef = dialogRef;
  
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El diálogo de inicio de sesión se cerró');
    });
  }
  
  
  // En tu componente NavbarComponent

signUp(): void {
  this.router.navigate(['/sig']);
}


  buscarUnVehiculo(nombre: string) {
    this.router.navigate(['/buscador', nombre]);
  }

  async logOut(): Promise<void> {
    try {
      await this.authService.logOut();
      this.router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }
}
