import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceRecord } from '../../model/service-record';
import { ServiceRecordService } from '../../services/service-record.service';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../model/vehicle';


@Component({
  selector: 'app-service-record',
  templateUrl: './service-record.component.html',
  styleUrl: './service-record.component.css'
})

export class ServiceRecordComponent implements OnInit {

  allServiceRecords: ServiceRecord[] = [];
  upServiceRecord: ServiceRecord | undefined;
  isEdit: boolean = false;
  Create: boolean = false;
  Search_id: number | null = null;
  search: number = 2;

  constructor(private serviceRecordService: ServiceRecordService, private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.serviceRecordService.getAllServiceRecords().subscribe({
      next: (response) => {
        this.allServiceRecords = response;
        //change for uallsr
        this.serviceRecordService.uallsr(response);
      },
      error: (err) => {
        alert("Failed To Access Data " + JSON.stringify(err));
      }
    });
  }

  create() {
    this.search = 2;
    this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    const serviceRecord: ServiceRecord = {
      serviceRecordID: form.value.serviceRecordID,
      vehicleID: form.value.vehicleId,
      serviceAdvisorID: form.value.serviceAdvisorId,
      serviceDate: form.value.serviceDate,
      status: form.value.status,
    };
    this.serviceRecordService.createServiceRecord(serviceRecord).subscribe({
      next: (response) => {
        this.allServiceRecords.push(response);
        this.updateVehicle(serviceRecord.vehicleID, serviceRecord.status);
        this.Create = false;
      },
      error: (err) => {
        alert("Failed To Create Data " + JSON.stringify(err));
      }
    });
  }

  delete(id: number) {
    this.search = 2;
    this.Search_id = null;
    
    this.serviceRecordService.deleteServiceRecord(id).subscribe({
      next: () => {
        // Remove the record from the local list
        this.allServiceRecords = this.allServiceRecords.filter(record => record.serviceRecordID !== id);
      },
      error: err => {
        alert("Failed To Delete Data " + JSON.stringify(err));
      }
    });
  }
  

  update(id: number) {
    this.search = 2;
    this.Search_id = null;
    this.isEdit = !this.isEdit;
  
    if (this.isEdit) {
      // Fetch the service record by ID to populate the form for editing
      this.serviceRecordService.getServiceRecordById(id).subscribe({
        next: (response) => {
          this.upServiceRecord = response;
        },
        error: (err) => {
          alert("Failed To Fetch Service Record Data " + JSON.stringify(err));
        }
      });
    } else {
      // Update the service record
      if (this.upServiceRecord) {
        this.serviceRecordService.updateServiceRecord(this.upServiceRecord).subscribe({
          next: () => {
            // Update the vehicle status after successfully updating the service record
            this.updateVehicleStatus(this.upServiceRecord.vehicleID, this.upServiceRecord.status);
          },
          error: (err) => {
            alert("Failed To Update Service Record Data " + JSON.stringify(err));
          }
        });
      }
    }
  }
  updateVehicleStatus(v_id: number, status: string) {
    this.vehicleService.getVehicleById(v_id).subscribe({
      next: vc => {
        vc.status = status;
        this.vehicleService.updateVehicle(vc).subscribe({
          next: () => {
            alert("Vehicle status updated");
          },
          error: err => {
            alert("Failed To Update Vehicle " + JSON.stringify(err));
          }
        });
      },
      error: err => {
        alert("Failed To Fetch Vehicle " + JSON.stringify(err));
      }
    });
  }  

  getServiceRecordById(id: number): ServiceRecord {
    return this.allServiceRecords.find(record => record.serviceRecordID === id);
  }

  Search() {
    if (this.Search_id != null) {
      this.serviceRecordService.getServiceRecordById(this.Search_id).subscribe({
        next: (response) => {
          this.upServiceRecord = response;
          this.search = 0;
        },
        error: (err) => {
          this.search = 1;
        }
      });
    }
  }

  close() {
    this.search = 2;
    this.Search_id = null;
  }

  updateVehicle(v_id: number, st: string) {
    this.vehicleService.getVehicleById(v_id).subscribe({
      next: (vehicle) => {
        vehicle.status = st;
        this.vehicleService.updateVehicle(vehicle).subscribe({
          next: () => {
            alert("Updated Successfully");
          },
          error: (err) => {
            alert("Failed To Update Data " + JSON.stringify(err));
          }
        });
      },
      error: (err) => {
        alert("Failed To Access Data " + JSON.stringify(err));
      }
    });
  }
  
 /* allServiceRecords: ServiceRecord[] = [];
  upServiceRecord: ServiceRecord | undefined;
  isEdit: boolean = false;
  Create: boolean = false;
  Search_id: number | null = null;
  search: number = 2;

  constructor(private serviceRecordService: ServiceRecordService,private vehicleService:VehicleService) {}

  ngOnInit(): void {
    this.allServiceRecords = this.serviceRecordService.getAllServiceRecords();
  }

  create() {
    this.search = 2;
    this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    const serviceRecord: ServiceRecord = {
      serviceRecordID: form.value.serviceRecordID,
      vehicleID: form.value.vehicleId,
      serviceAdvisorID: form.value.serviceAdvisorId,
      serviceDate: form.value.serviceDate,
      status: form.value.status,
    };
    this.serviceRecordService.createServiceRecord(serviceRecord);
    this.updateVehicle(serviceRecord.vehicleID,serviceRecord.status);
    this.Create = false;
  }

  delete(id: number) {
    this.search = 2;
    this.Search_id = null;
    this.serviceRecordService.deleteServiceRecordById(id);
  }

  update(id: number) {
    this.search = 2;
    this.Search_id = null;
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.upServiceRecord = this.serviceRecordService.getServiceRecordById(id);
    } else {
      if (this.upServiceRecord) {
        this.serviceRecordService.updateServiceRecord(this.upServiceRecord);
        this.updateVehicle(this.upServiceRecord.vehicleID,this.upServiceRecord.status);
      }
    }
  }

  getServiceRecordById(id: number): ServiceRecord{
    return this.serviceRecordService.getServiceRecordById(id);
  }

  Search() {
    this.upServiceRecord = this.serviceRecordService.getServiceRecordById(this.Search_id || 0);
    this.search = this.upServiceRecord ? 0 : 1;
  }

  close() {
    this.search = 2;
    this.Search_id = null;
  }
  updateVehicle(v_id:number,st:string){
    let v:Vehicle;this.vehicleService.getVehicleById(v_id).subscribe({
      next: response => { v = response; },
      error: err => { alert("Failed To Access Data " + JSON.stringify(err)); }
    });;
    v.status=st;
    this.vehicleService.updateVehicle(v).subscribe(
      {
        next: response => {
          alert("Updated Successfully"); 
        },
        error: err => {
          alert("Failed To Update Data " + JSON.stringify(err));
        }
      }
    );;
  }*/
}
