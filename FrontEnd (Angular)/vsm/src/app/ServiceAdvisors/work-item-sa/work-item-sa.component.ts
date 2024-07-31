import { Component, OnInit } from '@angular/core';
import { WorkItemService } from '../../services/work-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkItem } from '../../model/work-item';
import { NgForm } from '@angular/forms';
import { BillofmaterialService } from '../../services/billofmaterial.service';
import { BillOfMaterial } from '../../model/billof-material';
import { ServiceRecordService } from '../../services/service-record.service';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../model/vehicle';

@Component({
  selector: 'app-work-item-sa',
  templateUrl: './work-item-sa.component.html',
  styleUrl: './work-item-sa.component.css'
})
export class WorkItemSaComponent implements OnInit{

  srId: number;
  close: boolean = false;
  upWorkItem: WorkItem | undefined;
  isEdit: boolean = false;
  Create: boolean = false;
  allworkItem: WorkItem[] = [];

  constructor(
    private workItemService: WorkItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private billServices: BillofmaterialService,
    private serviceRecordServices: ServiceRecordService,
    private vehicleServices: VehicleService
  ) {
    this.srId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!, 10);
  }

  ngOnInit(): void {
    this.loadWorkItems();
  }

  loadWorkItems(): void {
    this.workItemService.getWorkItemBySRId(this.srId).subscribe({
      next: (items) => {
        this.allworkItem = items;
      },
      error: (err) => {
        alert("Failed to fetch work items: " + JSON.stringify(err));
      }
    });
  }

  create(): void {
    this.Create = true;
  }

  submit(form: NgForm): void {
    const workItem: WorkItem = {
      workItemID: 0, // ID will be auto-generated
      serviceRecordID: this.srId,
      itemName: form.value.itemName,
      quantity: form.value.quantity,
      cost: form.value.cost,
    };

    this.workItemService.createWorkItem(workItem).subscribe({
      next: () => {
        this.Create = false;
        this.loadWorkItems(); // Reload work items after creation
      },
      error: (err) => {
        alert("Failed to create work item: " + JSON.stringify(err));
      }
    });
  }

  delete(id: number): void {
    this.workItemService.deleteWorkItem(id).subscribe({
      next: () => {
        this.loadWorkItems(); // Reload work items after deletion
      },
      error: (err) => {
        alert("Failed to delete work item: " + JSON.stringify(err));
      }
    });
  }

  update(id: number): void {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.upWorkItem = this.getWorkItemById(id);
    } else {
      if (this.upWorkItem) {
        this.workItemService.updateWorkItem(this.upWorkItem).subscribe({
          next: () => {
            this.loadWorkItems(); // Reload work items after update
          },
          error: (err) => {
            alert("Failed to update work item: " + JSON.stringify(err));
          }
        });
      }
    }
  }

  getWorkItemById(id: number): WorkItem | undefined {
    return this.allworkItem.find(item => item.workItemID === id);
  }

  bom(): void {
    let sum: number = 0;
    for (let item of this.allworkItem) {
      sum += item.quantity * item.cost;
    }

    let bill: BillOfMaterial = {
      billOfMaterialID: 0, // ID will be auto-generated
      serviceRecordID: this.srId,
      amount: sum
    };
    
    this.billServices.createBillOfMaterial(bill).subscribe({
      next: () => {
        console.log("Bill created with amount: " + sum);
        this.updateServiceRecordAndVehicleStatus();
      },
      error: (err) => {
        alert("Failed to create bill: " + JSON.stringify(err));
      }
    });
  }

  updateServiceRecordAndVehicleStatus(): void {
    this.serviceRecordServices.getServiceRecordById(this.srId).subscribe({
      next: (sr) => {
        sr.status = "Serviced";
        this.serviceRecordServices.updateServiceRecord(sr).subscribe({
          next: () => {
            this.updateVehicleStatus(sr.vehicleID, "Serviced");
          },
          error: (err) => {
            alert("Failed to update service record: " + JSON.stringify(err));
          }
        });
      },
      error: (err) => {
        alert("Failed to fetch service record: " + JSON.stringify(err));
      }
    });

    this.close = true;
  }

  updateVehicleStatus(v_id: number, status: string): void {
    this.vehicleServices.getVehicleById(v_id).subscribe({
      next: (vc) => {
        vc.status = status;
        this.vehicleServices.updateVehicle(vc).subscribe({
          next: () => {
            alert("Vehicle status updated");
          },
          error: (err) => {
            alert("Failed to update vehicle: " + JSON.stringify(err));
          }
        });
      },
      error: (err) => {
        alert("Failed to fetch vehicle: " + JSON.stringify(err));
      }
    });
  }

  /*srId:number;
  close:boolean=false;
  upWorkItem: WorkItem | undefined;
  isEdit: boolean = false;
  constructor(private workItemService:WorkItemService,private activatedRoute:ActivatedRoute,private router:Router,
    private billServices:BillofmaterialService,private serviceRecordServices:ServiceRecordService,private vehicleServices:VehicleService
  ){
    this.srId=parseInt(activatedRoute.snapshot.paramMap.get('id'),10);
  }
  ngOnInit(): void {
    this.allworkItem=this.workItemService.getWorkItemBySRId(this.srId);
  }
  Create:boolean=false;
  allworkItem:WorkItem[]=[];
  create() {
   // this.search = 2;
   // this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    const workItem: WorkItem = {
      workItemID: form.value.workItemID,
      serviceRecordID: this.srId,
      itemName: form.value.itemName,
      quantity: form.value.quantity,
      cost: form.value.cost,
    };
    // form.reset();
    this.workItemService.createWorkItem(workItem);
    this.Create = false;
    this.allworkItem=this.workItemService.getWorkItemBySRId(this.srId);
  }
  delete(id: number) {
   // this.search = 2;
   // this.Search_id = null;
    this.workItemService.deleteWorkItemById(id);
    this.allworkItem=this.workItemService.getWorkItemBySRId(this.srId);
  }

  update(id: number) {
   // this.search = 2;
   // this.Search_id = null;
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.upWorkItem = this.getWorkItemById(id);
    } else {
      if (this.upWorkItem) {
        this.workItemService.updateWorkItem(this.upWorkItem);
      }
    }
   
  }

  getWorkItemById(id: number): WorkItem | undefined {
    return this.allworkItem.find(item => item.workItemID === id);
  }
  bom() {
  let sum: number = 0;
  for (let i = 0; i < this.allworkItem.length; i++) {
    sum += this.allworkItem[i].quantity * this.allworkItem[i].cost;
  }
  let bill: BillOfMaterial = {
    billOfMaterialID: 0,
    serviceRecordID: this.srId,
    amount: sum
  };

  this.billServices.create(bill);
    console.log(sum);

  this.serviceRecordServices.getServiceRecordById(this.srId).subscribe({
    next: sr => {
      sr.status = "Serviced";
      this.serviceRecordServices.updateServiceRecord(sr).subscribe({
        next: () => {
          this.updateVehicleStatus(sr.vehicleID, "Serviced");
        },
        error: err => {
          alert("Failed To Update Service Record " + JSON.stringify(err));
        }
      });
    },
    error: err => {
      alert("Failed To Fetch Service Record " + JSON.stringify(err));
    }
  });

  this.close = true;
  return;
}

updateVehicleStatus(v_id: number, status: string) {
  this.vehicleServices.getVehicleById(v_id).subscribe({
    next: vc => {
      vc.status = status;
      this.vehicleServices.updateVehicle(vc).subscribe({
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
*/
 /* bom(){
    let sum:number=0;
    for(let i=0;i<this.allworkItem.length;i++){
      sum+=this.allworkItem[i].quantity*this.allworkItem[i].cost;
    }
    let bill:BillOfMaterial={
      billOfMaterialID: 0,
      serviceRecordID: this.srId,
      amount: sum
    }
    this.billServices.create(bill);
    console.log(sum);
    
    let v_id:number;
    let sr=this.serviceRecordServices.getServiceRecordById(this.srId);
    sr.status="Serviced";
    v_id=sr.vehicleID;
    this.serviceRecordServices.updateServiceRecord(sr);
    let vc:Vehicle;
    this.vehicleServices.getVehicleById(v_id).subscribe(
      {
        next:response=>{vc=response;}
        ,
        error:err=>{alert("Failed To Fetched Data"+JSON.stringify(err));}
      }
    );
    vc.status="Serviced";
    this.vehicleServices.updateVehicle(vc).subscribe({
      next:response=>{alert("Vehicle status updated");}
        ,
        error:err=>{alert("Failed To Fetched Data"+JSON.stringify(err));}
    });
    this.close=true;
    return ;
  }
*/

}
