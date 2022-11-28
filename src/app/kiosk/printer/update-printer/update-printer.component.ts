import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NGXToastrService } from 'app/service/toastr.service';

import { identity } from 'rxjs';
import { AddPrinter } from 'app/model/addprinter';


@Component({
  selector: 'app-update-printer',
  templateUrl: './update-printer.component.html',
  styleUrls: ['./update-printer.component.scss'],
  providers: [NGXToastrService]
})
export class UpdatePrinterComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  addprinter = new AddPrinter();
  addprinters:AddPrinter[];

  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.addprinter = JSON.parse(localStorage.getItem('editprinter'));
    console.log(this.addprinter);
    }

  getPrinterList(){
    
    return this.http.get<AddPrinter[]>(environment.smartSafeAPIUrl + '/addprinter/displayprinterlist', this.httpOptions);
  }
  getAllPrintersList() {
    return this.getPrinterList().
      subscribe((data) => {
        console.log(data);
        this.addprinters = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  updatePrinter(id:number) {
    console.log('we are in update method')
    
    console.log(id);

  this.http.put<AddPrinter>(environment.smartSafeAPIUrl + '/addprinter/updateprinter',+id,  this.httpOptions)
    .subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.updateSuccess();
        this.getAllPrintersList();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });

  
  console.log(JSON.stringify(this.addprinter));
}
}


