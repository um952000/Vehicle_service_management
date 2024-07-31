import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent implements OnInit{
  allVehicles:Vehicle[]=[];
  upVehicle:Vehicle|undefined;
  isEdit:boolean=false;
  Create:boolean=false;
  Search_id:number;
  search:number=2;
  constructor(private vehicleService:VehicleService){}

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(
      {
        next: response => {
          this.allVehicles = response;
          console.log(this.allVehicles); // Log the received data
        },
        error: err => {
          alert("Failed To Access Data " + JSON.stringify(err));
        }
      }
    );
  }

  create() {
    this.search = 2;
    this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    let vehicle: Vehicle = {
      vehicleID: form.value.vehicleId,
      company: form.value.company,
      model: form.value.model,
      year: form.value.year,
      vin: form.value.vin,
      customerID: form.value.customerId,
      serviceDueDate: form.value.serviceDueDate,
      status: form.value.status
    };
    this.vehicleService.createVehicle(vehicle).subscribe(
      {
        next: response => {
          alert("Vehicle is created Successfully");
        },
        error: err => {
          alert("Failed To Create Data " + JSON.stringify(err));
        }
      }
    )
    this.Create = false;
  }

  delete(id: number) {
    this.search = 2;
    this.Search_id = null;
    this.vehicleService.deleteVehicleById(id).subscribe(
      {
        next: response => {
          alert("Deleted Successfully");this.allVehicles = this.allVehicles.filter(vehicle => vehicle.vehicleID !== id);
        },
        error: err => {
          alert("Failed To Delete Data " + JSON.stringify(err));
        }
      }
    )
  }

  update(id: number) {
    this.search = 2;
    this.Search_id = null;
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.upVehicle = this.getVehicleById(id);
    } else {
      this.vehicleService.updateVehicle(this.upVehicle).subscribe(
        {
          next: response => {
            alert("Updated Successfully"); const index = this.allVehicles.findIndex(v => v.vehicleID === this.upVehicle.vehicleID);
            this.allVehicles[index] = this.upVehicle;
          },
          error: err => {
            alert("Failed To Update Data " + JSON.stringify(err));
          }
        }
      );
    }
  }

  getVehicleById(id: number): Vehicle {
    return this.allVehicles.find(vehicle => vehicle.vehicleID === id);
  }

  Search() {
    this.vehicleService.getVehicleById(this.Search_id).subscribe({
      next: response => { this.upVehicle = response; },
      error: err => { alert("Failed To Access Data " + JSON.stringify(err)); }
    });
    this.search = this.upVehicle ? 0 : 1;
  }

  close() {
    this.search = 2;
    this.Search_id = null;
  }

 
}
