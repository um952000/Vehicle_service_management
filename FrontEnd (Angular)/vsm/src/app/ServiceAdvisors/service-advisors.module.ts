import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceAdvisorsComponent } from './service-advisors.component';
import { RouterModule } from '@angular/router';
import { DashboardSaComponent } from './dashboard-sa/dashboard-sa.component';
import { WorkItemSaComponent } from './work-item-sa/work-item-sa.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ServiceAdvisorsComponent,
    DashboardSaComponent,
    WorkItemSaComponent
  ],
  imports: [
    CommonModule,RouterModule,FormsModule
  ]
})
export class ServiceAdvisorsModule { }
