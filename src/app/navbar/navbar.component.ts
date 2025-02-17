import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logoff(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/home']);
  }
}

