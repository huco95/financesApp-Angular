import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent implements OnInit {
  isOpen: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  @HostListener('window:keydown', ['$event'])
  clickHandler(event: KeyboardEvent) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      this.closeDropdown();
    }
  }

  toogleDropdown() {
    this.isOpen = !this.isOpen;  
  }

  closeDropdown() {
    this.isOpen = false;
  }

  logout() {
    this.authService.logout();
  }

}
