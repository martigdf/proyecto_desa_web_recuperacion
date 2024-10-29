import { Component, OnInit } from '@angular/core';
import {UserFormComponent} from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  imports: [UserFormComponent],
  standalone: true
})
export class EditUserPage  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
