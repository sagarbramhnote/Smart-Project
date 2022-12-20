import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createstore',
  templateUrl: './createstore.component.html',
  styleUrls: ['./createstore.component.scss'],
  providers: [NGXToastrService]
})
export class CreatestoreComponent implements OnInit {
  @ViewChild("addClassForm", null) addClassForm: NgForm;


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }

  storeInfoRequest = new StoreInfoRequest();
  storeInfoRequests: StoreInfoRequest[];

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  getStoreList() {
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/all');
  }
  getAllStoresList() {
    return this.getStoreList().
      subscribe((data) => {
        console.log(data);
        this.storeInfoRequests = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addStore() {
   
    this.http.post<StoreInfoRequest>(environment.smartSafeAPIUrl + '/storeinfo/', this.storeInfoRequest).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllStoresList();
        this.addClassForm.reset();
        
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeCustommessage(err.error.message);
      });
    console.log(JSON.stringify(this.storeInfoRequest));
    this.getAllStoresList();
  }

  editstoreInfoRequest(storeInfoRequest: StoreInfoRequest) {

    console.log(storeInfoRequest.id)
    localStorage.setItem("id",String(storeInfoRequest.id))

    console.log(storeInfoRequest)
    localStorage.setItem('editStore', JSON.stringify(storeInfoRequest));
    this.router.navigate(["/store/updatestore"]);

  }

storedelete(storeInfoRequest: StoreInfoRequest) {
  console.log('coming into delete')

    if(storeInfoRequest.configured){
      console.log('coming inside active true')
      Swal.fire({
        title: 'You cannot delete a active store ',
        text: "",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
       
      })
    }
    if(!(storeInfoRequest.configured)){

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'

  }).then((result) => {
    console.log("hi");

    if (result.value) {
      console.log("hello");
      this.http.delete<StoreInfoRequest>(environment.smartSafeAPIUrl + "/storeinfo/" + storeInfoRequest.id, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          this.service.typeDelete();
          this.getAllStoresList();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}
}


  ngOnInit() {
    this.getAllStoresList();
  }

}
