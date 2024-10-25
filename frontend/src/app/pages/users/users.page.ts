import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.page.html',
  styleUrl: './users.page.css',
})
export class UsersPage implements OnInit {
  private router: Router = inject(Router);
  private apiService: BackendApiService = inject(BackendApiService);

  private userList: User[] = [];
  user_container!: HTMLElement | null;

  async ngOnInit(): Promise<void> {
    this.user_container = document.getElementById('user-container');
    if (this.user_container) {
      try {
        this.userList = await this.apiService.get('admin/users');
        console.log(this.userList);
        this.renderUserList(this.userList);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    } else {
      console.error('El contenedor de usuarios no se encontró.');
    }
  }

  renderUserList(users: User[]) {
    this.user_container!.innerHTML = '';
    users.forEach((user) => {
      const row = this.createUserRow(user);
      this.user_container?.appendChild(row);
    });
  }

  createUserRow(user: User) {
    const registrationDate = new Date(
      user.registration_date
    ).toLocaleDateString('es-ES');
    const userRow = document.createElement('tr');
    userRow.innerHTML = `
    <td class="p-4 border-b border-slate-600">
      <div class="flex flex-col">
        <p class="text-sm font-semibold text-slate-300">${user.id}</p>
      </div>
    </td>
    <td class="p-4 border-b border-slate-600">
      <div class="flex items-center gap-3">
        <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="${user.name}" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
        <div class="flex flex-col">
          <p class="text-sm font-semibold text-slate-300">${user.name} ${user.lastname}</p>
          <p class="text-sm text-slate-400">${user.email}</p>
        </div>
      </div>
    </td>
    <td class="p-4 border-b border-slate-600">
      <div class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
        <div class="flex flex-col">
          <p class="text-sm font-semibold text-slate-300">${user.role}</p>
        </div>
      </div>
    </td>
    <td class="p-4 border-b border-slate-600">
      <p class="text-sm text-slate-400">${registrationDate}</p>
    </td>
    <td class="p-4 border-b border-slate-600">
      <button type="button" class="text-slate-300 hover:text-white">Editar</button> <!-- Modifica esto según sea necesario -->
    </td>`;
    return userRow;
  }

  goToAdminPanel() {
    this.router.navigate(['/admin-panel']);
  }
}
