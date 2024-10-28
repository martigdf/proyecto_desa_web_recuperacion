import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { BackendApiService } from '../../services/backend-api.service';
import { NgFor, NgIf } from '@angular/common';
import { ConfirmationTabComponent } from '../../components/confirmation-tab/confirmation-tab.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf, ConfirmationTabComponent],
  templateUrl: './users.page.html',
  styleUrl: './users.page.css',
})
export class UsersPage implements OnInit {
  private router: Router = inject(Router);
  private apiService: BackendApiService = inject(BackendApiService);
  showConfirmationTab = false;
  idToDelete: string | null = null;
  public userList: User[] = [];

  async ngOnInit(): Promise<void> {
    try {
      this.userList = await this.apiService.get('admin/users');
      console.log(this.userList);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }

  formatRegistrationDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES');
  }

  openDeleteTab(id: string) {
    this.idToDelete = id;
    this.showConfirmationTab = true;
  }

  async deleteUser(id: string) {
    try {
      await this.apiService.delete(`users/${id}`);
      this.showConfirmationTab = false;
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }

  confirmDelete() {
    if (this.idToDelete) {
      this.deleteUser(this.idToDelete);
    }
  }

  goToAdminPanel() {
    this.router.navigate(['/admin-panel']);
  }
}
