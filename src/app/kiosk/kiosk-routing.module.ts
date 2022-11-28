import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillValidatorComponent } from './bill-validator/bill-validator.component';

import { KioskComponent } from './kiosk/kiosk.component';

import { LocksComponent } from './locks/locks.component';
import { UpdateLockComponent } from './locks/update-lock/update-lock.component';
import { PrinterComponent } from './printer/printer.component';

const routes: Routes = [
  {
    path: 'newkiosk',
     component: KioskComponent,
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
    path: 'locks',
     component: LocksComponent,
    data: {
      title: 'Locks'
    },
    
  },
  {
    path: 'update-lock',
     component: UpdateLockComponent,
    data: {
      title: 'update-lock'
    },
    
  },
  {
    path: 'update-billValidator',
     component: UpdateBillValidatorComponent,
    data: {
      title: 'update-billValidator'
    },
    
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioskRoutingModule { }
