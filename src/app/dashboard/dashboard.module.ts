import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ViewStatusComponent } from './view-status/view-status.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MychartComponent } from './mychart/mychart.component';


@NgModule({
  declarations: [DashboardComponent, ViewStatusComponent, MychartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxSpinnerModule
  ]
})
export class DashboardModule { }

