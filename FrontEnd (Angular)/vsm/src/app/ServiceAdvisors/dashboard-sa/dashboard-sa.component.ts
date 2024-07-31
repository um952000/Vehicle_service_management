import { Component, OnInit } from '@angular/core';
import { ServiceRecordService } from '../../services/service-record.service';
import { ServiceRecord } from '../../model/service-record';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sa',
  templateUrl: './dashboard-sa.component.html',
  styleUrl: './dashboard-sa.component.css'
})
export class DashboardSaComponent implements OnInit{
  
  serviceAdvisorID:string;
  r:string="";
  constructor(private serviceRecordService:ServiceRecordService,private activatedRoute:ActivatedRoute,private router:Router){
    this.serviceAdvisorID=activatedRoute.snapshot.paramMap.get('id');
    this.r="/service-advisor/"+this.serviceAdvisorID+"/work-item";
  }
  allServiceRecord:ServiceRecord[]=[];
  ngOnInit(): void {
    this.serviceRecordService.getAllServiceRecords().subscribe(
      {
        next:res=>{this.serviceRecordService.uallsr(res);
          this.allServiceRecord=this.serviceRecordService.getAllServiceRecordsBySAId(this.serviceAdvisorID);
        },
        error:err=>{alert("Didn't etch SA data");}
      }
    );
   // this.allServiceRecord=this.serviceRecordService.getAllServiceRecordsBySAId(this.serviceAdvisorID);
  }
  

}
