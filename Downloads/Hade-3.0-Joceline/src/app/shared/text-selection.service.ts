import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextSelectionService {

  isActive: boolean = false;

  constructor() { }

  toggleActiveState() {
    this.isActive = !this.isActive;
  }

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
}
