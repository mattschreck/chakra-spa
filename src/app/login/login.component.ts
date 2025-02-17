import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../data/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private router: Router, private userService: UserService) {}

  doLogin(): void {
    this.userService.login(this.email, this.password).subscribe(
      (res: any) => {
        if (res.success) {
          this.message = 'Login erfolgreich!';
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('userId', res.userId);
          if (res.name) {
            localStorage.setItem('userName', res.name);
          }
          if (res.email) {
            localStorage.setItem('userEmail', res.email);
          }
          // Nach Login zur Account- oder Home-Seite navigieren
          this.router.navigate(['/account']);
        } else {
          this.message = 'Fehler: ' + res.message;
        }
      },
      (err: any) => {
        this.message = 'Server-Fehler: ' + err.message;
      }
    );
  }
}
