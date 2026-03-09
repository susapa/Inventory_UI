import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    console.log('Header toggle clicked');
    this.toggle.emit();
  }
}
