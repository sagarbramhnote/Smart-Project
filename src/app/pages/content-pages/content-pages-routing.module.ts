import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { OtpComponent } from '../otp/otp.component';


const routes: Routes = [
  {
    path: '',
    children: [
     
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },   
      
      {
        path: 'lockscreen',
        component: LockScreenPageComponent,
        data: {
          title: 'Lock Screen page'
        }
      },   
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      
      {
        path: 'maintenance',
        component: MaintenancePageComponent,
        data: {
          title: 'Maintenance Page'
        }
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        data: {
          title: 'Register Page'
        }
      }  ,
      {
        path: 'otp',
        component: OtpComponent,
        data: {
          title: 'otp'
        }
      } ,
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
