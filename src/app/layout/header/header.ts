import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  protected authService = inject(AuthService);
  private router = inject(Router);
  user = this.authService.currentUser;
  isDropdownOpen = false;

  constructor() { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  @Output() toggle = new EventEmitter<void>();
  
  onToggle() {
    console.log('Header toggle clicked');
    this.toggle.emit();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserDetail() {
    this.authService.getUserDetail().subscribe({
      next: (res) => {
        console.log(this.user().role);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
