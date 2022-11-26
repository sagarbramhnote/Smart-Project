import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/service/toastr.service';
import { AddPrinter } from 'app/model/addprinter';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss'],
  providers: [NGXToastrService]
})
export class PrinterComponent implements OnInit {
  
  // printer = new PrinterInfoRequest();
  // printers : PrinterInfoRequest[];

  show: boolean;
  @ViewChild("addClassForm", null) addClassForm: NgForm;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }
  addprinter = new AddPrinter();
  addprinters : AddPrinter[];
  constructor(private http: HttpClient, private router: Router, private service: NGXToastrService, private changeDetectorRefs: ChangeDetectorRef) {
    this.show = false;
    this.getAllPrintersList();
  }
  

    getPrinterList() {

      return this.http.get<AddPrinter[]>(environment.smartSafeAPIUrl + '/addprinter/displayprinterlist', this.httpOptions);
      this.show = false;
      this.getAllPrintersList();
    }

    getAllPrintersList() {
      return this.getPrinterList().
        subscribe((data) => {
          console.log(data);
          this.addprinters = data;
          //this.changeDetectorRefs.markForCheck();
        });
    }

    addPrinter() {
        this.http.post<AddPrinter>(environment.smartSafeAPIUrl + '/addprinter/savePrinter/', this.addprinter, this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          this.service.addSuccess();
          this.getAllPrintersList();
          this.addClassForm.reset();
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

    deleteAddPrinter(id){
      return this.http.delete(environment.smartSafeAPIUrl + '/addprinter/deleteprinter'+'/'+id)
      
     .subscribe( data => {
          console.log(data);
          this.getAllPrintersList();
        })   
      }
      updateAddPrinter(printer){
        console.log(this.addClassForm);

      }
  

    
        

  // constructor(private http: HttpClient,
  //   private router: Router,
  //   private service: NGXToastrService,
  //   private changeDetectorRefs: ChangeDetectorRef) {
  // }
  // getPrinterList() {
  //   return this.http.get<PrinterInfoRequest[]>(environment.smartSafeAPIUrl + '/printer/all');
  // }
  // getAllPrinterList() {
  //   return this.getPrinterList().
  //     subscribe((data) => {
  //       console.log(data);
  //       this.printers = data;
  //       this.changeDetectorRefs.markForCheck();
  //     });
  // }
  // addPrinter() {
  //   this.http.post<PrinterInfoRequest>(environment.smartSafeAPIUrl + '/printer/', this.printer).subscribe(
  //     res => {
  //       console.log(res);
  //       //event.confirm.resolve(event.newData);
  //       this.service.addSuccess();
  //       this.getAllPrinterList();
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         console.log("Client-side error occured.");
  //       } else {
  //         console.log("Server-side error occured.");
  //       }
  //       this.service.typeWarning();
  //     });
  //   console.log(JSON.stringify(this.printer));
  //   this.getAllPrinterList();
  // }
  ngOnInit() {
    
    this.getAllPrintersList();
  }

}



