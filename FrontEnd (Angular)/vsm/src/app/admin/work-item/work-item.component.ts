import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WorkItem } from '../../model/work-item';
import { WorkItemService } from '../../services/work-item.service';
import { BillofmaterialService } from '../../services/billofmaterial.service';
import { BillOfMaterial } from '../../model/billof-material';
import { ServiceRecordService } from '../../services/service-record.service';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.css']
})
export class WorkItemComponent implements OnInit {
  allWorkItems: WorkItem[] = [];
  upWorkItem: WorkItem | undefined;
  isEdit: boolean = false;
  Create: boolean = false;
  Search_id: number | null = null;
  search: number = 2;

  constructor(
    private workItemService: WorkItemService,
    private billService: BillofmaterialService,
    private serviceRecordService: ServiceRecordService
  ) {}

  ngOnInit(): void {
    this.loadWorkItems();
  }

  loadWorkItems(): void {
    this.workItemService.getAllWorkItems().subscribe({
      next: (data) => {
        this.allWorkItems = data;
      },
      error: (err) => {
        alert("Failed to fetch work items: " + JSON.stringify(err));
      }
    });
  }

  create() {
    this.search = 2;
    this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    const workItem: WorkItem = {
      workItemID: form.value.workItemID,
      serviceRecordID: form.value.serviceRecordId,
      itemName: form.value.itemName,
      quantity: form.value.quantity,
      cost: form.value.cost,
    };

    this.workItemService.createWorkItem(workItem).subscribe({
      next: () => {
        this.Create = false;
        this.loadWorkItems();
        this.updateBill(workItem.serviceRecordID);
      },
      error: (err) => {
        alert("Failed to create work item: " + JSON.stringify(err));
      }
    });
  }

  delete(id: number, sr_id: number) {
    this.search = 2;
    this.Search_id = null;

    this.workItemService.deleteWorkItem(id).subscribe({
      next: () => {
        this.loadWorkItems();
        this.updateBill(sr_id);
      },
      error: (err) => {
        alert("Failed to delete work item: " + JSON.stringify(err));
      }
    });
  }

  update(id: number, sr_id: number) {
    this.search = 2;
    this.Search_id = null;
    this.isEdit = !this.isEdit;

    if (this.isEdit) {
      this.workItemService.getWorkItemById(id).subscribe({
        next: (response) => {
          this.upWorkItem = response;
        },
        error: (err) => {
          alert("Failed to fetch work item: " + JSON.stringify(err));
        }
      });
    } else {
      if (this.upWorkItem) {
        this.workItemService.updateWorkItem(this.upWorkItem).subscribe({
          next: () => {
            this.updateBill(sr_id);
          },
          error: (err) => {
            alert("Failed to update work item: " + JSON.stringify(err));
          }
        });
      }
    }
  }

  getWorkItemById(id: number): WorkItem | undefined {
    return this.allWorkItems.find(item => item.workItemID === id);
  }

  Search() {
    this.workItemService.getWorkItemById(this.Search_id!).subscribe({
      next: (response) => {
        this.upWorkItem = response;
        this.search = this.upWorkItem ? 0 : 1;
      },
      error: (err) => {
        alert("Failed to search work item: " + JSON.stringify(err));
      }
    });
  }

  close() {
    this.search = 2;
    this.Search_id = null;
  }

  updateBill(sr_id: number) {
    this.workItemService.getWorkItemBySRId(sr_id).subscribe({
      next: (items) => {
      //  alert("Work Item for SRID is Founded");
        let sum = items.reduce((total, item) => total + item.quantity * item.cost, 0);
        let bill:BillOfMaterial;
        this.billService.getBillOfMaterialsByServiceRecordId(sr_id).subscribe(
          {
            next:res=>{
              //alert("RESPONSE"+res.billOfMaterialID+" "+res.serviceRecordID+" "+res.amount);
              bill=res;bill.amount=sum;//alert("Bill "+bill.billOfMaterialID +" "+bill.serviceRecordID+" "+bill.amount);
              this.billService.updateBillOfMaterial(bill).subscribe({
                next: () => {
                  console.log(`Bill updated with amount: ${sum}`);
                },
                error: (err) => {
                  alert("Failed to update bill: " + JSON.stringify(err));
                }
              });
            }
            ,
            error:err=>{JSON.stringify(err);}
          }
        );
        //this.billService.update(bill);
        
      },
      error: (err) => {
        alert("Failed to fetch work items for bill update: " + JSON.stringify(err));
      }
    });
  }
  /*allWorkItems: WorkItem[] = [];
  upWorkItem: WorkItem | undefined;
  isEdit: boolean = false;
  Create: boolean = false;
  Search_id: number | null = null;
  search: number = 2;

  constructor(private workItemService: WorkItemService,private billService:BillofmaterialService,private serviceRecordService:ServiceRecordService) {}

  ngOnInit(): void {
    this.allWorkItems = this.workItemService.getAllWorkItems();
  }

  create() {
    this.search = 2;
    this.Search_id = null;
    this.Create = true;
  }

  submit(form: NgForm) {
    let s=form.value.serviceRecordID;
    const workItem: WorkItem = {
      workItemID: form.value.workItemID,
      serviceRecordID: form.value.serviceRecordId,
      itemName: form.value.itemName,
      quantity: form.value.quantity,
      cost: form.value.cost,
    };
    // form.reset();
    this.workItemService.createWorkItem(workItem);
    this.Create = false;
    this.updatebill(workItem.serviceRecordID);
    console.log(workItem.serviceRecordID);
  }

  delete(id: number,sr_id:number) {
    this.search = 2;
    this.Search_id = null;
    this.workItemService.deleteWorkItemById(id);

    this.updatebill(sr_id);
  }

  update(id: number,sr_id:number) {
    this.search = 2;
    this.Search_id = null;
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.upWorkItem = this.getWorkItemById(id);
    } else {
      if (this.upWorkItem)
         {
        this.workItemService.updateWorkItem(this.upWorkItem);
        this.updatebill(sr_id);
      }
    }
  }

  getWorkItemById(id: number): WorkItem | undefined {
    return this.allWorkItems.find(item => item.workItemID === id);
  }

  Search() {
    this.upWorkItem = this.workItemService.getWorkItemById(this.Search_id!);
    this.search = this.upWorkItem ? 0 : 1;
  }

  close() {
    this.search = 2;
    this.Search_id = null;
  }
  updatebill(sr_id:number){
    let sum:number=0;
    for(let i=0;i<this.allWorkItems.length;i++){
      if(sr_id==this.allWorkItems[i].serviceRecordID){
        sum+=this.allWorkItems[i].quantity*this.allWorkItems[i].cost
      }
    }
    let bill:BillOfMaterial={
      billOfMaterialID: 0,
      serviceRecordID: sr_id,
      amount: sum
    }
    this.billService.update(bill);
  }*/
}
