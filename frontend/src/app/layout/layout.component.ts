import { Component } from '@angular/core';
import { NavbarPage } from "../pages/navbar/navbar.page";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarPage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
