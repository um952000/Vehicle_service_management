import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './admin/vehicle/vehicle.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { ServiceAdvisorComponent } from './admin/service-advisor/service-advisor.component';
import { ServiceRecordComponent } from './admin/service-record/service-record.component';
import { WorkItemComponent } from './admin/work-item/work-item.component';
import { BillofmaterialComponent } from './admin/billofmaterial/billofmaterial.component';
import { ServiceAdvisorsComponent } from './ServiceAdvisors/service-advisors.component';
import { DashboardSaComponent } from './ServiceAdvisors/dashboard-sa/dashboard-sa.component';
import { WorkItemSaComponent } from './ServiceAdvisors/work-item-sa/work-item-sa.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { PrintInVoiceComponent } from './admin/print-in-voice/print-in-voice.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminComponent,canActivate:[AuthGuardService], children:
    [
     {path:"vehicle",component:VehicleComponent,canActivateChild:[AuthGuardService]},
     {path:"dashboard",component:DashboardComponent},
     {path:"customer",component:CustomerComponent},
     {path:"service-advisor",component:ServiceAdvisorComponent},
     {path:"service-record",component:ServiceRecordComponent},
     {path:"work-item",component:WorkItemComponent},
     {path:"bill-of-material",component:BillofmaterialComponent},
     {path:"schedule/:id",component:ScheduleComponent},
     {path:"print-invoice/:id",component:PrintInVoiceComponent}
    ]
  },
  {path:"service-advisor/:id",component:ServiceAdvisorsComponent,canActivate:[AuthGuardService], children:[
    {path:"dashboard/:id",component:DashboardSaComponent,canActivateChild:[AuthGuardService]},
    {path:"work-item/:id",component:WorkItemSaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
