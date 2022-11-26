import { Billvalidator } from 'app/model/billvalidator';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bill-validator',
  templateUrl: './bill-validator.component.html',
  styleUrls: ['./bill-validator.component.scss'],
  providers: [NGXToastrService]
})
export class BillValidatorComponent implements OnInit {

  billvalidator = new Billvalidator();
  billvalidators: Billvalidator[];
  
constructor(private http: HttpClient,
  private router: Router,
  private service: NGXToastrService,
  private changeDetectorRefs: ChangeDetectorRef) {
}
getBillvalidatorList() {
  return this.http.get<Billvalidator[]>(environment.smartSafeAPIUrl + '/billvalidatorinfo/all');
}
getAllBillvalidatorsList() {
  return this.getBillvalidatorList().
    subscribe((data) => {
      console.log(data);
      this.billvalidators = data;
      this.changeDetectorRefs.markForCheck();
    });
}
addBillvalidator() {
  this.billvalidator.configured=false; 
  this.http.post<Billvalidator>(environment.smartSafeAPIUrl + '/billvalidatorinfo/', this.billvalidator).subscribe(
    res => {
      console.log(res);
      //event.confirm.resolve(event.newData);
      this.service.addSuccess();
      this.getAllBillvalidatorsList();
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
      this.service.typeWarning();
    });
  console.log(JSON.stringify(this.billvalidator));
  this.getAllBillvalidatorsList();
}
  ngOnInit() {
    this.getAllBillvalidatorsList();
  }

}
