import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-tab',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-tab.component.html',
  styleUrl: './confirmation-tab.component.css'
})
export class ConfirmationTabComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
  }

  cancel() {
    this.canceled.emit();
  }
}
