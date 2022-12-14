import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { DashboardComponent } from './dashboard.component';
import { MychartComponent } from './mychart/mychart.component';
import { ViewStatusComponent } from './view-status/view-status.component';

const routes: Routes = [
  {
    path: '',
     component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    canActivate: [AuthGuard],
    
  },

  {
    path: 'view-status',
     component: ViewStatusComponent,
    data: {
      title: 'view-status'
    },
    
  },
  {
    path: 'charts',
     component: MychartComponent,
    data: {
      title: 'mychart'
    },
    
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
