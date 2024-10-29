import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertController, IonicModule} from '@ionic/angular';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule
  ]
})
export class UserFormComponent implements OnInit {

  @Input() user?: User;
  @Output() userUpdated = new EventEmitter<User>();
  @Output() canceled = new EventEmitter();

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private alertController: AlertController, private usersService: UsersService, private router: Router) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  async ngOnInit() {
    // Traer los datos del usuario si se ha pasado uno
    // Sacamos el id de la url
    const id = window.location.pathname.split('/').pop();
    console.log('id:', id);
    if (id) {
      try {
        this.user = await this.usersService.getUser(id);
        this.userForm.patchValue(this.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      // Le agregamos el campo id
      if (this.user) {
        user.id = this.user.id;
      }
      if (this.user) {
        this.userUpdated.emit(user);  // Emitimos el evento
        console.log('Usuario emitido:', user);
      }
    }
  }

  onCancel() {
    this.canceled.emit();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
