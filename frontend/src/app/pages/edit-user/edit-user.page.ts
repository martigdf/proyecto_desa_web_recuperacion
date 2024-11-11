import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  standalone: true,
  imports: [
    UserFormComponent,
    IonicModule,
    CommonModule,
  ]
})
export class EditUserPage implements OnInit {
  constructor(private userService: UsersService, private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  async onUserUpdated(user: User) {
    try {
      await this.userService.updateUser(user);
      console.log('Usuario actualizado exitosamente');
      window.alert('Usuario actualizado exitosamente');
      // Si es adminirador, redirigir a la lista de usuarios
      if (this.authService.isAdmin()) {
        this.router.navigate(['admin-panel/users']);
      } else {
        this.router.navigate(['']);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      window.alert('Error al actualizar el usuario');
    }
  }

  onCanceled() {
    console.log('Edición cancelada');
    window.alert('Edición cancelada')
    this.router.navigate(['admin-panel/users']);
  }
}
