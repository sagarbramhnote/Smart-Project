import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NGXToastrService } from 'app/service/toastr.service';
import { LocksInfoRequest } from 'app/model/locksInfoRequest';

@Component({
  selector: 'app-update-lock',
  templateUrl: './update-lock.component.html',
  styleUrls: ['./update-lock.component.scss'],
  providers: [NGXToastrService]
})
export class UpdateLockComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  lock = new LocksInfoRequest();
  locks:LocksInfoRequest[];

  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.lock = JSON.parse(localStorage.getItem('editLock'));
  }
  getLockList(){
    
    return this.http.get<LocksInfoRequest[]>(environment.smartSafeAPIUrl+'/lockinfo/all', this.httpOptions);
  }
  getAllLocksList() {
    return this.getLockList().
      subscribe((data) => {
        console.log(data);
        this.locks = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  updateLock() {
    
    this.http.put<LocksInfoRequest>(environment.smartSafeAPIUrl + "/updatelock", this.lock, this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.updateSuccess();
        this.getAllLocksList();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });

  
  console.log(JSON.stringify(this.lock));
}
}

 

