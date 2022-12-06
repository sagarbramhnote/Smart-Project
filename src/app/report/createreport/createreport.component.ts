import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';
import { UserAccount } from 'app/model/user';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-createreport',
  templateUrl: './createreport.component.html',
  styleUrls: ['./createreport.component.scss'],
  providers: [NGXToastrService]
})
export class CreatereportComponent implements OnInit {

  store = new StoreInfoRequest();
  storeNameDy:string;
  dataResponce:any[];
  dataStoreResponce:any[];
  empId:number;
  stores: StoreInfoRequest[];
  role = new Role();
  roles: Role[];
  employees: UserAccount[];
  selectedStore = new StoreInfoRequest();
  selectedUser:UserAccount;
  startDate:string;
  endDate:string;

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllStoresList();
    this.getAllRolesList();
    
  }
 
  getStoreList() {
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/all');

  }
  getRoleList() {

    return this.http.get<Role[]>(environment.smartSafeAPIUrl + '/role/all');
  }
  findUserByRole(role: string) {
    console.log(this.role)
    
    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl + "/userInfo/role/" + this.role.name);
  }
  getAllRolesList() {
    return this.getRoleList().
      subscribe((data) => {
        console.log(data);
        // for (let index = 0; index < data.length; index++) {
        //   if(data[index].name=="EMPLOYEE" || data[index].name=="MANAGER"){
        //     this.roles.push('{name:data[index].name,value:data[index].id}')
        //   }

        // }
        // this.roles=data;
        this.roles = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  getAllStoresList() {
    return this.getStoreList().
      subscribe((data) => {
        console.log(data);
        this.stores = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getStoresByStoreName(storeName: string) {
    return this.http.get<StoreInfoRequest>(environment.smartSafeAPIUrl + '/storeinfo/' + storeName);
  }

  onStoreSelected(storeName: string) {
    this.storeNameDy=storeName;
    this.getStoresByStoreName(storeName).
      subscribe((data) => {
        this.selectedStore = data;

      })
  }

  onRoleChange(role: any) {
    //alert(role);

    return this.findUserByRole(role).
      subscribe((data) => {
        console.log(data);
        this.employees = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  
  onSelectUserId(userId:number){
    this.empId=userId;
  }
  startDateC(startDate){
    this.startDate=startDate.target.value;
  }
  endDateC(endDate){
    this.endDate=endDate.target.value;
  }
 
  generatReport(){
    let request={
      'startDate':this.startDate,
      'endDate':this.endDate
    };
    
    console.log("into the excel report")
  this.service.gotoEmployeeReportToExcel(this.empId+"/"+request.startDate+"/"+request.endDate).subscribe(x =>{
    console.log(x)
    console.log('coming here')
    
     const blob = new Blob([x], { type: 'application/application/vnd.openxalformats-officedocument.spreadsheetml'});
        

    
     const data = window.URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = data;
     link.download =  'EmployeeBillEntryReport.xlsx'; 
   

    link.dispatchEvent(new MouseEvent ('click', {bubbles: true, cancelable: true, view: window}));
     setTimeout (function() {
      window.URL.revokeObjectURL(data);
       link. remove();
     }, 100);
    }
   )

     
   

  }

  generateclass(){
    let request={
      'startDate':this.startDate,
      'endDate':this.endDate
    };

    this.service.gotoEmployeeReport(this.empId+"",request).subscribe(data=>{
      //data.name=this.selectedUser.username;
      data.reportName="Manager Report";
      console.log(data)
      console.log(data.data.name)
     
      // this.dataResponce=data.data[0].data;
      this.dataResponce=data.data[1].data;
      
      

      this.dataStoreResponce= data.storeInfoResponse;//({values:data.storeInfoResponse})
      console.log(this.dataStoreResponce);
      //this.ipcService.send('message',data);
    });
    
    
  }
}
function saveAs(file: File) {
  throw new Error('Function not implemented.');
}

