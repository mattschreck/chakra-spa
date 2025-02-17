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

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  doLogin() {
    this.userService.login(this.email, this.password).subscribe(
      res => {
        if (res.success) {
          this.message = 'Login erfolgreich!';
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('userId', res.userId);
          // optional userName, userEmail
          this.router.navigate(['/home']);
        } else {
          this.message = 'Fehler: ' + res.message;
        }
      },
      err => {
        this.message = 'Server-Fehler: ' + err.message;
      }
    );
  }
}
