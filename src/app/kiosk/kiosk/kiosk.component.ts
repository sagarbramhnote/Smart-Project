import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KioskInfoRequest } from 'app/model/kioskInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.scss']
})
export class KioskComponent implements OnInit {

//   kiosk = new KioskInfoRequest();
//   kiosks : KioskInfoRequest[];

//   constructor(private http: HttpClient,
//     private router: Router,
//     private service: NGXToastrService,
//     private changeDetectorRefs: ChangeDetectorRef) {

// }

// getKioskList() {
//   return this.http.get<KioskInfoRequest[]>(environment.smartSafeAPIUrl + '/kiosk/all');
// }
// getAllKioskList() {
//   return this.getKioskList().
//     subscribe((data) => {
//       console.log(data);
//       this.kiosks = data;
//       this.changeDetectorRefs.markForCheck();
//     });
// }
// addLock() {
//   this.http.post<KioskInfoRequest>(environment.smartSafeAPIUrl + '/locks/', this.kiosk).subscribe(
//     res => {
//       console.log(res);
//       //event.confirm.resolve(event.newData);
//       this.service.addSuccess();
//       this.getAllKioskList();
//     },
//     (err: HttpErrorResponse) => {
//       if (err.error instanceof Error) {
//         console.log("Client-side error occured.");
//       } else {
//         console.log("Server-side error occured.");
//       }
//       this.service.typeWarning();
//     });
//   console.log(JSON.stringify(this.kiosk));
//   this.getAllKioskList();
// }

  ngOnInit() {
  //  this.getAllKioskList();

  }

}
