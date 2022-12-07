import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillValidatorInfoRequest } from 'app/model/billValidatorInfoRequest';
import { KioskInfoRequest } from 'app/model/kioskInfoRequest';
import { LocksInfoRequest } from 'app/model/locksInfoRequest';
import { PrinterInfoRequest } from 'app/model/printerInfoRequest';
import { Role } from 'app/model/role';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { UserAccount } from 'app/model/user';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-assignstore',
  templateUrl: './assignstore.component.html',
  styleUrls: ['./assignstore.component.scss'],
  providers: [NGXToastrService]
})
export class AssignstoreComponent implements OnInit {
  role = new Role();
  roles: Role[];

  store = new StoreInfoRequest();
  stores: StoreInfoRequest[];
  selectedStore = new StoreInfoRequest();
  //selectedStores:StoreInfoRequest[];
  employee = new UserAccount();
  employees: UserAccount[];

  kiosk = new KioskInfoRequest();
  kiosks : KioskInfoRequest[];

  billValidator = new BillValidatorInfoRequest();
  billValidators : BillValidatorInfoRequest[];

  lock = new LocksInfoRequest();
  locks : LocksInfoRequest[];

  printer = new PrinterInfoRequest();
   printers : PrinterInfoRequest[];

 

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  getUnAssignedStoreList() {
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/all/unassigned');
  }
  getAllUnassignedStoresList() {
    return this.getUnAssignedStoreList().
      subscribe((data) => {
        console.log(data);
        this.stores = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getStoresByStoreName(storeName: string) {
    return this.http.get<StoreInfoRequest>(environment.smartSafeAPIUrl + '/storeinfo/' + storeName);
  }

  onStoreSelected(storeName: string) {
    this.getStoresByStoreName(storeName).
      subscribe((data) => {
        this.selectedStore = data;

      })
  }


  getRoleList() {

    return this.http.get<Role[]>(environment.smartSafeAPIUrl + '/role/all');
  }
  getAllRolesList() {
    return this.getRoleList().
      subscribe((data) => {
        console.log(data);
        this.roles = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getUnassignedEmployeesByrole(roleName: string) {
    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl + '/userInfo/role/' + roleName +"/unassignedusers");
  }

  onRoleSelected(roleName: string) {
    this.getUnassignedEmployeesByrole(roleName).
      subscribe((data) => {
        this.employees = data;

      })
  }

  getUnassignedkiosk() {
    return this.http.get<KioskInfoRequest[]>(environment.smartSafeAPIUrl + '/kiosk/unassignedKiosks');
  }

  getkioskSelected() {
    return this.getUnassignedkiosk().
    subscribe((data) =>{
      console.log(data);
      this.kiosks = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getUnassignedBill() {
    return this.http.get<BillValidatorInfoRequest[]>(environment.smartSafeAPIUrl + '/billValidator/unassignedBillValidators');
  }

  getbillValidatorSelected() {
    return this.getUnassignedBill().
    subscribe((data) => {
      console.log(data);
      this.billValidators = data;
      this.changeDetectorRefs.markForCheck();
    });
  }
  
  getUnassignedprinter() {
    return this.http.get<PrinterInfoRequest[]>(environment.smartSafeAPIUrl + '/printer/unassignedPrinters');
  }

  getprinterSelected() {
    return this.getUnassignedprinter().
    subscribe((data) => {
      console.log(data);
      this.printers = data;
      this.changeDetectorRefs.markForCheck();
    });
  }


  getUnassignedlocks() {
    return this.http.get<LocksInfoRequest[]>(environment.smartSafeAPIUrl + '/locks/unassignedlocks');
  }

  getlockSelected() {
    return this.getUnassignedlocks().
    subscribe((data) => {
      console.log(data);
      this.locks = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  ngOnInit() {
    this.getAllUnassignedStoresList();
  
    this.getAllRolesList();
    this.getkioskSelected();
    this.getbillValidatorSelected();
    this.getprinterSelected();
   this.getlockSelected();
    
   
  }

  assignStoretouser(storeId: number, userId: number, kId:number, bId:number, pId: number, lId: number) {
    return this.http.post(environment.smartSafeAPIUrl + '/storeinfo/assign/store/' + storeId + "/user/" + userId + "/kiosk/" + kId + "/billValidator/" + bId + "/printer/" + pId + "/locks/" + lId, {});
  }
  assignStore(storeId: number, userId: number, kId:number, bId:number, pId: number, lId: number) {
    return this.assignStoretouser(storeId, userId, kId, bId, pId, lId).

      subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl("dashboard");
      });
  }


}