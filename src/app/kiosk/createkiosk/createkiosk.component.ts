import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/service/toastr.service';
import { AddKiosk } from 'app/model/addkiosk';


@Component({
  selector: 'app-createkiosk',
  templateUrl: './createkiosk.component.html',
  styleUrls: ['./createkiosk.component.scss'],
  providers: [NGXToastrService]
})

export class CreatekioskComponent implements OnInit {
  show: boolean;
 
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }
  addkiosk = new AddKiosk();
  addkiosks : AddKiosk[];
  constructor(private http: HttpClient, private router: Router, private service: NGXToastrService, private changeDetectorRefs: ChangeDetectorRef) {
    this.show = false;
    this.getAllKiosksList();
  }
  getKioskList() {

    return this.http.get<AddKiosk[]>(environment.smartSafeAPIUrl + '/addkiosk/displaykiosklist', this.httpOptions);
    this.show = false;
    this.getAllKiosksList();
  }

  getAllKiosksList() {
    return this.getKioskList().
      subscribe((data) => {
        console.log(data);
        this.addkiosks = data;
        //this.changeDetectorRefs.markForCheck();
      });
  }

  addKiosk() {
      this.http.post<AddKiosk>(environment.smartSafeAPIUrl + '/addkiosk/savekiosk/', this.addkiosk, this.httpOptions)
    .subscribe(
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
    console.log(JSON.stringify(this.addkiosk));
    this.getAllKiosksList();
  }

ngOnInit() {
  this.getAllKiosksList();
  }


}
