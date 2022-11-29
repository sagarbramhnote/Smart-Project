import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserAccount } from 'app/model/user';
import { NGXToastrService } from 'app/service/toastr.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers: [NGXToastrService]
})
export class UpdateUserComponent implements OnInit {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
qw
  user = new UserAccount();
  users: UserAccount[];
  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    

    // this.user =  JSON.parse(localStorage.getItem('editUser'));
    this.user =  JSON.parse(localStorage.getItem('editUser'))
    let a= (localStorage.getItem('id'))
    console.log('this is number ' + a)
    console.log(this.user.id)
    return this.http.get<UserAccount>(environment.smartSafeAPIUrl + "/userInfo/" + a,this.httpOptions).subscribe(data =>{
        // console.log(user.firstName + ' ' +user.lastName + ' ' + user.role + ' ' + user.username)
        console.log(data)
        // console.log('printed data above ')
        // this.user.firstName = data['firstName']
        // this.user.lastName = data['lastName']
        // this.user.mobile = data['mobile']
        this.user = data
        console.log('print the user ' + this.user)
       })
    
  }
 
  getUserList(){
    
    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl+'/userInfo/all', this.httpOptions);
  }

    getAllUsersList() {
       
            
      return this.getUserList().
      subscribe((data) => {
        console.log(data);
        this.users = data;
        this.changeDetectorRefs.markForCheck();

      });
      
          }  
  updateUserManagement() {
    


      this.http.put<UserAccount>(environment.smartSafeAPIUrl +"/userInfo/"+this.user.id, this.user, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          this.service.updateSuccess();
          this.getAllUsersList();
          

        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          this.service.typeWarning();
        });

    
    console.log(JSON.stringify(this.user));
  }
}
