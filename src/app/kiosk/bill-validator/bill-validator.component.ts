import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import { BillValidatorInfoRequest } from 'app/model/billValidatorInfoRequest';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bill-validator',
  templateUrl: './bill-validator.component.html',
  styleUrls: ['./bill-validator.component.scss'],
  providers: [NGXToastrService]
})
export class BillValidatorComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }

  billValidator = new BillValidatorInfoRequest();
  billValidators : BillValidatorInfoRequest[];
  
  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  getBillValidatorList() {
    return this.http.get<BillValidatorInfoRequest[]>(environment.smartSafeAPIUrl + '/billValidator/all');
  }
  getAllBillValidatorList() {
    return this.getBillValidatorList().
      subscribe((data) => {
        console.log(data);
        this.billValidators = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addBillValidator() {
    this.http.post<BillValidatorInfoRequest>(environment.smartSafeAPIUrl + '/billValidator/', this.billValidator).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllBillValidatorList();
        this.addClassForm.reset();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        //this.service.typeWarning();
        this.service.typeCustommessage(err.error.message);
      });
    console.log(JSON.stringify(this.billValidator));
    this.getAllBillValidatorList();
  }
  editBillValidator(billValidator: BillValidatorInfoRequest ) {

     localStorage.setItem('editbillValidator', JSON.stringify(billValidator));
    
    this.router.navigate(["/kiosk/update-billValidator"]);

  }



  billValidatordelete(billValidator: BillValidatorInfoRequest) {
    console.log('coming into delete')
    if(billValidator.active){
      console.log('coming inside active true')
      Swal.fire({
        title: 'You cannot delete a active bill validator ',
        text: "",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
       
      })
    }
    if(!(billValidator.active)){
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
        this.http.delete<BillValidatorInfoRequest>(environment.smartSafeAPIUrl + "/billValidator/" + billValidator.id, this.httpOptions).subscribe(
          res => {
            console.log(res);
            //event.confirm.resolve(event.newData);
            this.service.typeDelete();
            this.getAllBillValidatorList();
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
    this.getAllBillValidatorList();
  }

}