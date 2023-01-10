import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreResponse } from 'app/model/storeResponse';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-charts-reports',
  templateUrl: './charts-reports.component.html',
  styleUrls: ['./charts-reports.component.scss']
})
export class ChartsReportsComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }
    storeNames:string;
    constructor(private http: HttpClient,
      private router: Router,
      private service: NGXToastrService,
      private changeDetectorRefs: ChangeDetectorRef) {
        this.storeInfo();
    }
;
  storename:string=localStorage.getItem("storename");
  storeinfo=new StoreResponse();
  storeinfermation:StoreResponse[];
  storeInfo(){
    console.log("we are in  charts-reports.ts storeInfo methode");
 return this.http.get<StoreResponse[]>(environment.smartSafeAPIUrl + "/storeinfo/StoreInfoForDashBoard/"+this.storename,this.httpOptions).subscribe(data=>{
      console.log(data);
      this.storeinfermation=data;
      
      
      
  });
}
ngOnInit(){
  console.log("we are in charts-reports ngOnInit() methode");
  this.storeInfo();
  


}

}

