import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UserAccount } from 'app/model/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/service/toastr.service';
import { Role } from 'app/model/role';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user-management',
  templateUrl: './add-user-management.component.html',
  styleUrls: ['./add-user-management.component.scss'],
  providers: [NGXToastrService]
})
export class AddUserManagementComponent implements OnInit {
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

  user = new UserAccount();
  users: UserAccount[];

  role = new Role();
  roles: Role[];
  registerForm: any;


  constructor(private http: HttpClient, private router: Router, private service: NGXToastrService, private changeDetectorRefs: ChangeDetectorRef) {
    this.show = false;
    this.getAllUsersList();
  }
  getUserList() {

    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl + '/userInfo/all', this.httpOptions);
  }

  getAllUsersList() {
    return this.getUserList().
      subscribe((data) => {
        console.log(data);
        this.users = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  onSaveConfirm() {
    console.log("this method is add usermethod component");
   //this.user.role = this.role.name;
   console.log(this.user.role);
    console.log(this.user.passLength);


   

    this.http.post<UserAccount>(environment.smartSafeAPIUrl + '/userInfo/', this.user, this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        
        this.service.addSuccess();
      
        this.getAllUsersList();
        this.addClassForm.reset();
        this.router.navigate(["/user-management"]);

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeCustommessage(err.error.message);
      });
    console.log(JSON.stringify(this.user));
    this.getAllUsersList();
  }
  showPassword() {
    this.show = !this.show;
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

  ngOnInit() {
    
    this.getAllRolesList();
    
  }

}
