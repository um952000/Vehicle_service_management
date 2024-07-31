import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle/vehicle.component';
import { RouterOutlet } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';
import { ServiceAdvisorComponent } from './service-advisor/service-advisor.component';
import { ServiceRecordComponent } from './service-record/service-record.component';
import { WorkItemComponent } from './work-item/work-item.component';
import { BillofmaterialComponent } from './billofmaterial/billofmaterial.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PrintInVoiceComponent } from './print-in-voice/print-in-voice.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    VehicleComponent,
    AdminComponent,
    DashboardComponent,
    CustomerComponent,
    ServiceAdvisorComponent,
    ServiceRecordComponent,
    WorkItemComponent,
    BillofmaterialComponent,
    ScheduleComponent,
    PrintInVoiceComponent
  ],
  imports: [
    CommonModule,RouterModule,RouterOutlet,FormsModule,HttpClientModule
  ]
})
export class AdminModule { }
