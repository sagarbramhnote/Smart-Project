<<<<<<< HEAD
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/service/toastr.service';
import { AddPrinter } from 'app/model/addprinter';
import { NgForm } from '@angular/forms';

=======
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrinterInfoRequest } from 'app/model/printerInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss'],
  providers: [NGXToastrService]
})
export class PrinterComponent implements OnInit {
  
  // printer = new PrinterInfoRequest();
  // printers : PrinterInfoRequest[];

<<<<<<< HEAD
  show: boolean;
  @ViewChild("addClassForm", null) addClassForm: NgForm;
=======
>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }
<<<<<<< HEAD
  addprinter = new AddPrinter();
  addprinters : AddPrinter[];
  constructor(private http: HttpClient, private router: Router, private service: NGXToastrService, private changeDetectorRefs: ChangeDetectorRef) {
    this.show = false;
    this.getAllPrintersList();
  }
  
=======
  
   printer = new PrinterInfoRequest();
   printers : PrinterInfoRequest[];


  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
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
  addPrinter() {
    this.http.post<PrinterInfoRequest>(environment.smartSafeAPIUrl + '/printer/', this.printer).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllPrinterList();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });
    console.log(JSON.stringify(this.printer));
    this.getAllPrinterList();
  }

  editAddPrinter(printer: PrinterInfoRequest ) {

    localStorage.setItem('editPrinter', JSON.stringify(printer));
   
   this.router.navigate(["/kiosk/update-printer"]);

 }

  printerdelete(printer: PrinterInfoRequest) {
    console.log('coming into delete')
  
    if(printer.active){
      console.log('coming inside active true')
      Swal.fire({
        title: 'You cannot delete a active printer ',
        text: "",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
       
      })
    }
    if(!(printer.active)){
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
        this.http.delete<PrinterInfoRequest>(environment.smartSafeAPIUrl + "/printer/" + printer.id, this.httpOptions).subscribe(
          res => {
            console.log(res);
            //event.confirm.resolve(event.newData);
            this.service.typeDelete();
            this.getAllPrinterList();
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
>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b

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
      console.log("---shalili----"+JSON.stringify(this.addprinter));
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
      editAddPrinter(addprinter: AddPrinter) {
        console.log("we are in edit method")
        console.log(addprinter);

        localStorage.setItem('editprinter', JSON.stringify(addprinter));
        console.log(localStorage.getItem('editprinter'));
        this.router.navigate(["/kiosk/update-printer"]);
    
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
<<<<<<< HEAD
    
    this.getAllPrintersList();
=======
    this.getAllPrinterList();
>>>>>>> f44bdfcffaf084fb0d992b961a7307cf51693d3b
  }

}



