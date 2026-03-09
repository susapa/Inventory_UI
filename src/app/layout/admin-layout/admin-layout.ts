import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, Header, Sidebar, Footer, CommonModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  isSidebarVisible = signal(true);

  toggleSidebar() {
    console.log('Sidebar toggle triggered, current state:', this.isSidebarVisible());
    this.isSidebarVisible.update(v => !v);
  }
}
