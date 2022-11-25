import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrinterInfoRequest } from 'app/model/printerInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss']
})
export class PrinterComponent implements OnInit {
  
  // printer = new PrinterInfoRequest();
  // printers : PrinterInfoRequest[];


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
  //  this.getAllPrinterList();
  }

}
