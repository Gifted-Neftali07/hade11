import { Router, RouterModule } from '@angular/router';
import { Component, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { LogComponent } from '../pages/auth/log/log.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { TextSelectionService } from '../shared/text-selection.service';
import { AccessibilityServiceService } from '../accessibility-service.service';

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
export class NavbarComponent  {
  isLargeCursor: boolean = false;
  isDyslexicFont: boolean = false;
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<any>;

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService,
  private accessibilityService: AccessibilityServiceService,
  public textSelectionService: TextSelectionService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.authService.getCurrentUser();
      }
    });
  }

  toggleAccessibilityOptions() {
    this.accessibilityService.toggleHighlightLinks();
  }

  areLinksHighlighted(): boolean {
    return this.accessibilityService.areLinksHighlighted();
  }
  


  CambiaTipografica(): void {
    this.accessibilityService.toggleDyslexicFont();
    this.isDyslexicFont = this.accessibilityService.isDyslexicFontActive();
  }
  

  toggleGrayScale(): void {
    this.accessibilityService.toggleGrayScale();
  }
  ///VOZ
  isActive = false;

  handleTextSelection(event: MouseEvent) {
    if (!this.isActive) return;

    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      this.speakText(selectedText);
    }
  }

  speakText(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  toggleActiveState() {
    this.isActive = !this.isActive;
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
