import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityServiceService {

  private linksHighlighted: boolean = false;
  private isDyslexicFontEnabled: boolean = false;

  private isCustomCursorEnabled: boolean = false;
  private isGrayScaleEnabled: boolean = false;

  constructor() { }

  toggleHighlightLinks(): void {
    this.linksHighlighted = !this.linksHighlighted;
  }

  areLinksHighlighted(): boolean {
    return this.linksHighlighted;
  }


  toggleCustomCursor(): void {
    this.isCustomCursorEnabled = !this.isCustomCursorEnabled;
    if (this.isCustomCursorEnabled) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }
  }

  isCustomCursorActive(): boolean {
    return this.isCustomCursorEnabled;
  }


  toggleDyslexicFont(): void {
    this.isDyslexicFontEnabled = !this.isDyslexicFontEnabled;
    if (this.isDyslexicFontEnabled) {
      this.enableDyslexicFont();
    } else {
      this.disableDyslexicFont();
    }
  }

  isDyslexicFontActive(): boolean {
    return this.isDyslexicFontEnabled;
  }

  enableDyslexicFont(): void {
    document.body.classList.add('dyslexic-font');
  }

  disableDyslexicFont(): void {
    document.body.classList.remove('dyslexic-font');
  }


  toggleGrayScale(): void {
    this.isGrayScaleEnabled = !this.isGrayScaleEnabled;
    if (this.isGrayScaleEnabled) {
      document.body.classList.add('gray-scale');
    } else {
      document.body.classList.remove('gray-scale');
    }
  }

  isGrayScaleActive(): boolean {
    return this.isGrayScaleEnabled;
  }
}
