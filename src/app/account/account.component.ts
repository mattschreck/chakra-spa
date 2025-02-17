import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userId = '';
  userName = '';
  userEmail = '';
  message = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    this.userId = localStorage.getItem('userId') || '';
    this.userName = localStorage.getItem('userName') || '';
    this.userEmail = localStorage.getItem('userEmail') || '';

    if (!token || !this.userId) {
      this.router.navigate(['/login']);
    }
  }

  logoff() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
