import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import { BillValidatorInfoRequest } from 'app/model/billValidatorInfoRequest';

@Component({
  selector: 'app-bill-validator',
  templateUrl: './bill-validator.component.html',
  styleUrls: ['./bill-validator.component.scss'],
  providers: [NGXToastrService]
})
export class BillValidatorComponent implements OnInit {

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
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });
    console.log(JSON.stringify(this.billValidator));
    this.getAllBillValidatorList();
  }
  ngOnInit() {
    this.getAllBillValidatorList();
  }

}
