import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isNavbarOpen = false;

  constructor(private router: Router) {}

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([`admin/${route}`]);
    this.isNavbarOpen = false;
  }

}
