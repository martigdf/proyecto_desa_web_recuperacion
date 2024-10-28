import { inject, Injectable, Signal, signal } from '@angular/core';
import { BackendApiService } from './backend-api.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  _apiService: BackendApiService = inject(BackendApiService);
  private userList = signal<User[]>([]);

  constructor() {
  }

  async updateUserList() {
    try {
      const users = await this._apiService.get('admin/users');
      this.userList.set(users);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  }

  get usersList() {
    return this.userList();
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this._apiService.delete(`users/${id}`);
      this.userList.set(this.userList().filter(user => user.id !== parseInt(id)));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
