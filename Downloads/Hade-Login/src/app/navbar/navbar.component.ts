
import { Router,RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { LogComponent } from '../pages/auth/log/log.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,MatToolbarModule, MatButtonModule,LogComponent,MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router,public dialog: MatDialog) {}
/*
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LogComponent, {
      width: '250px',
      // Puedes pasar datos al diálogo si es necesario
      // data: { ... }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Esta parte se ejecuta cuando se cierra el diálogo
      console.log('El diálogo de inicio de sesión se cerró');
      // Puedes redirigir al usuario o manejar el resultado del diálogo aquí
    });
  }*/
    openLoginDialog(): void {
      const dialogRef = this.dialog.open(LogComponent, {
        width: '400px', // Puedes ajustar el ancho como prefieras
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('El diálogo de inicio de sesión se cerró');
        // Aquí puedes manejar el resultado del diálogo si es necesario
      });
    }

    

buscarUnVehiculo(nombre:string){
    this.router.navigate(['/buscador',nombre]);
  }

   private _router = inject(Router);

  private authservice = inject(AuthService);

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }

}
