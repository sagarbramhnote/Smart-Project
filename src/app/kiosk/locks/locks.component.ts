import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocksInfoRequest } from 'app/model/locksInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-locks',
  templateUrl: './locks.component.html',
  styleUrls: ['./locks.component.scss'],
  providers: [NGXToastrService]
})
export class LocksComponent implements OnInit {

  locksInfoRequest = new LocksInfoRequest();
  locksInfoRequests: LocksInfoRequest[];

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  addLocks() {
    this.http.post<LocksInfoRequest>(environment.smartSafeAPIUrl + '/locks/', this.locksInfoRequest).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });
    console.log(JSON.stringify(this.locksInfoRequest));
  }


  ngOnInit() {
  }

}
