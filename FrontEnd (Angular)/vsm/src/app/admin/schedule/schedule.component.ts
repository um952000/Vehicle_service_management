import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceRecordService } from '../../services/service-record.service';
import { ServiceRecord } from '../../model/service-record';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../model/vehicle';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  id:number;

  constructor(private serviceRecordService:ServiceRecordService,private activatedRoute:ActivatedRoute,private router:Router,
    private vehicleService:VehicleService
  ){
    this.id=parseInt(activatedRoute.snapshot.paramMap.get('id'));
  }
  submit(form: NgForm) {
    const serviceRecord: ServiceRecord = {
      serviceRecordID: form.value.serviceRecordID,
      vehicleID: this.id,
      serviceAdvisorID: form.value.serviceAdvisorId,
      serviceDate: form.value.serviceDate,
      status: form.value.status,
    };
    this.serviceRecordService.createServiceRecord(serviceRecord).subscribe(
      {
        next:res=>{alert("SR Created");}
        ,
          error: err => {
            alert("Failed To Update Data " + JSON.stringify(err));
          }
      }
    );
   // this.Create = false;
   let vehicle:Vehicle;
   this.vehicleService.getVehicleById(this.id).subscribe({
    next: response => {alert("Vehicle Details Fetched in Schedule TS"); vehicle = response; vehicle.status=serviceRecord.status;
      this.vehicleService.updateVehicle(vehicle).subscribe(
        {
          next: response => {
            alert("Updated Vehicle status Successfully"); 
          },
          error: err => {
            alert("Failed To Update Data " + JSON.stringify(err));
          }
        }
      );
    },
    error: err => { alert("Failed To Access Data " + JSON.stringify(err)); }
  });
  
   this.router.navigate(["/admin/dashboard"]);
  }
}
