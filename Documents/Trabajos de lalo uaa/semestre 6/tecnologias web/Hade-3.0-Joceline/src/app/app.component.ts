import { Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet,Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AccessibilityServiceService } from './accessibility-service.service';
import { TextSelectionService } from './shared/text-selection.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,FooterComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto2';
  loading = false;
  isLargeCursor: boolean = false;
  isDyslexicFont: boolean = false;

  constructor(private router: Router,
    private accessibilityService: AccessibilityServiceService,
    private textSelectionService: TextSelectionService//////VOZ,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd) {
        this.loading = false;
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


  //////VOZ
  @HostListener('document:mouseup', ['$event'])
  onDocumentMouseUp(event: MouseEvent) {
    this.textSelectionService.handleTextSelection(event);
  }
}
