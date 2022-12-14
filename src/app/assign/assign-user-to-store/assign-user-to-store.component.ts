import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { UserAccount } from 'app/model/user';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-assign-user-to-store',
  templateUrl: './assign-user-to-store.component.html',
  styleUrls: ['./assign-user-to-store.component.scss'],
  providers: [NGXToastrService]

})
export class AssignUserToStoreComponent implements OnInit {

  store = new StoreInfoRequest();
  stores: StoreInfoRequest[];
  selectedStore = new StoreInfoRequest();

  role = new Role();
  roles: Role[];

  employee = new UserAccount();
  employees: UserAccount[];

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

    assignStoretouser(storeId: number, userId: number) {
      return this.http.post(environment.smartSafeAPIUrl + '/storeinfo/assign/store/' + storeId + "/user/" + userId , {});
    }
    assignStore(storeId: number, userId: number) {
      return this.assignStoretouser(storeId, userId).
  
        subscribe((data) => {
          console.log(data);
          this.service.addAssignSuccess();
          this.router.navigateByUrl("assign/assign-user-to-store");
        });
    }

  ngOnInit() {
    this.getAllUnassignedStoresList();
    this.getAllRolesList();
  }

}
