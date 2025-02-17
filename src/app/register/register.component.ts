import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../data/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private router: Router, private userService: UserService) {}

  doRegister(): void {
    this.userService.register(this.name, this.email, this.password).subscribe(
      (res: any) => {
        if (res.success) {
          this.message = 'Registrierung erfolgreich!';
          // Direkt zur Home-Seite navigieren
          this.router.navigate(['/home']);
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
