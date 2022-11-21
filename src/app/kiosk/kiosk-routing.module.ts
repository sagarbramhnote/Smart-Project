import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillValidatorComponent } from './bill-validator/bill-validator.component';
import { CreatekioskComponent } from './createkiosk/createkiosk.component';
import { LocksComponent } from './locks/locks.component';
import { PrinterComponent } from './printer/printer.component';

const routes: Routes = [
  {
    path: 'createkiosk',
     component: CreatekioskComponent,
    data: {
      title: 'Kiosk Management'
    },
    
  },

  {
    path: 'bill-validator',
     component: BillValidatorComponent,
    data: {
      title: 'Bill Validator'
    },
    
  },

  {
    path: 'printer',
     component: PrinterComponent,
    data: {
      title: 'Printer'
    },
    
  },

  {
    path: 'sagar',
     component: LocksComponent,
    data: {
      title: 'Locks'
    },
    
  },

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioskRoutingModule { }
