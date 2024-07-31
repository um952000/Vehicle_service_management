import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-advisors',
  templateUrl: './service-advisors.component.html',
  styleUrl: './service-advisors.component.css'
})
export class ServiceAdvisorsComponent {
  isNavBarOpen = false;
  advisorId: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.advisorId = this.route.snapshot.paramMap.get('id');
  }

  toggleNavBar() {
    this.isNavBarOpen = !this.isNavBarOpen;
  }

  navigateTo(route: string, id: string) {
    this.router.navigate([`service-advisor/${id}/${route}/${id}`]);
    this.isNavBarOpen = false;
  }
}
