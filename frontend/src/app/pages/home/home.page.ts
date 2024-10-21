import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {

  private router : Router = inject(Router);

  Login() {
    this.router.navigate(['/login']);
  }
}
