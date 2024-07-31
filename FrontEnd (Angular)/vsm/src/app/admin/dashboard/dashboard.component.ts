import { Component } from '@angular/core';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  allVehicles: Vehicle[] = [];
  due: boolean = false;
  underServicing: boolean = false;
  serviced: boolean = false;
  selectedVehicle: Vehicle | null = null;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(
      {
        next: response => {
          this.allVehicles = response;
          console.log(this.allVehicles); // Log the received data

          // Update the status indicators after data is fetched
          this.updateStatusIndicators();
        },
        error: err => {
          alert("Failed To Access Data " + JSON.stringify(err));
        }
      }
    );
  }

  // Method to update status indicators
  updateStatusIndicators(): void {
    this.due = this.allVehicles.some(vehicle => vehicle.status === "Due");
    this.underServicing = this.allVehicles.some(vehicle => vehicle.status === "Under Servicing");
    this.serviced = this.allVehicles.some(vehicle => vehicle.status === "Serviced");
  }

  // Method to handle vehicle selection
  onVehicleSelect(event: Event): void {
    const selectedVehicleID = (event.target as HTMLSelectElement).value;
    if (selectedVehicleID) {
      this.selectedVehicle = this.allVehicles.find(vehicle => vehicle.vehicleID?.toString() === selectedVehicleID) || null;
    }
  }


}
