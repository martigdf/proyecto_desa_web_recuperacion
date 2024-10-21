import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.page.html',
  styleUrl: './users.page.css'
})
export class UsersPage {

  private router : Router = inject(Router);

  goToAdminPanel() {
    this.router.navigate(['/admin-panel']);
  }
} 
