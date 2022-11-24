import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import { Lock } from 'app/model/lock';

@Component({
  selector: 'app-locks',
  templateUrl: './locks.component.html',
  styleUrls: ['./locks.component.scss'],
  providers: [NGXToastrService]
})
export class LocksComponent implements OnInit {

  lock = new Lock();
  locks:Lock[];

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  getLockList() {
    return this.http.get<Lock[]>(environment.smartSafeAPIUrl + '/lockinfo/all');
  }
  getAllLocksList() {
    return this.getLockList().
      subscribe((data) => {
        console.log(data);
        this.locks = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addLock() {
    this.lock.configured=false; 
    this.http.post<Lock>(environment.smartSafeAPIUrl + '/lockinfo/', this.lock).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllLocksList();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });
    console.log(JSON.stringify(this.lock));
    this.getAllLocksList();
  }
  ngOnInit() {
  }

}
