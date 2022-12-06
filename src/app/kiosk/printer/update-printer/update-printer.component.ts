<<<<<<< HEAD
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NGXToastrService } from 'app/service/toastr.service';

import { identity } from 'rxjs';
import { AddPrinter } from 'app/model/addprinter';

=======
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrinterInfoRequest } from 'app/model/printerInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b

@Component({
  selector: 'app-update-printer',
  templateUrl: './update-printer.component.html',
  styleUrls: ['./update-printer.component.scss'],
  providers: [NGXToastrService]
})
export class UpdatePrinterComponent implements OnInit {
<<<<<<< HEAD
=======

>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
<<<<<<< HEAD
  addprinter = new AddPrinter();
  addprinters:AddPrinter[];
=======
  printer = new PrinterInfoRequest();
  printers:PrinterInfoRequest[];
>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b

  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
<<<<<<< HEAD
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
    
    console.log("total json is:-------"+JSON.stringify(this.addprinter));

  this.http.put<AddPrinter>(environment.smartSafeAPIUrl + '/addprinter/updateprinter/'+this.addprinter.id,this.addprinter,  this.httpOptions)
    .subscribe(
=======
    this.printer = JSON.parse(localStorage.getItem('editPrinter'));
  }
  getPrinterList() {
    return this.http.get<PrinterInfoRequest[]>(environment.smartSafeAPIUrl + '/printer/all');
  }
  getAllPrinterList() {
    return this.getPrinterList().
      subscribe((data) => {
        console.log(data);
        this.printers = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  updatePrinter(id:number) {
    
    this.http.put<PrinterInfoRequest>(environment.smartSafeAPIUrl + "/printer/"+id, this.printer, this.httpOptions).subscribe(
>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.updateSuccess();
<<<<<<< HEAD
        this.getAllPrintersList();
=======
        this.getAllPrinterList();
>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });

  
<<<<<<< HEAD
  
}
}


=======
  console.log(JSON.stringify(this.printer));
}
}
>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b
