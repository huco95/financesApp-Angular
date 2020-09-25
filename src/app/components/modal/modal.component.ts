import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() redirectTo: string;

  constructor(private router: Router) {
    this.hideBodyOverflow();
  }

  @HostListener('window:keydown', ['$event'])
  clickHandler(event: KeyboardEvent) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      this.closeModal();
    }
  }

  closeModal() {
    this.showBodyOverflow();
    this.router.navigate([this.redirectTo]);
  }

  private hideBodyOverflow() {
    document.body.classList.add('overflow-hidden');
  }

  private showBodyOverflow() {
    document.body.classList.remove('overflow-hidden');
  }
}
