import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../data/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userId = '';
  userName = '';
  userEmail = '';
  message = '';

  newEmail = '';
  newPassword = '';
  emailEditResult = '';
  pwEditResult = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    this.userId = localStorage.getItem('userId') || '';
    this.userName = localStorage.getItem('userName') || '';
    this.userEmail = localStorage.getItem('userEmail') || '';

    if (!token || !this.userId) {
      this.router.navigate(['/login']);
    }
  }

  logoff(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  updateEmail(): void {
    if (!this.newEmail) {
      this.emailEditResult = "Bitte eine neue E-Mail eingeben.";
      return;
    }
    this.userService.updateEmail(this.userId, this.newEmail).subscribe(
      (res: any) => {
        if (res.success) {
          this.emailEditResult = "E-Mail erfolgreich geändert!";
          localStorage.setItem('userEmail', res.updatedEmail);
          this.userEmail = res.updatedEmail;
        } else {
          this.emailEditResult = "Fehler: " + res.message;
        }
      },
      (err: any) => {
        this.emailEditResult = "Server-Fehler: " + err.message;
      }
    );
  }

  updatePassword(): void {
    if (!this.newPassword) {
      this.pwEditResult = "Bitte ein neues Passwort eingeben.";
      return;
    }
    this.userService.updatePassword(this.userId, this.newPassword).subscribe(
      (res: any) => {
        if (res.success) {
          this.pwEditResult = "Passwort erfolgreich geändert!";
        } else {
          this.pwEditResult = "Fehler: " + res.message;
        }
      },
      (err: any) => {
        this.pwEditResult = "Server-Fehler: " + err.message;
      }
    );
  }
}
