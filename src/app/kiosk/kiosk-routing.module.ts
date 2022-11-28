import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillValidatorComponent } from './bill-validator/bill-validator.component';
import { CreatekioskComponent } from './createkiosk/createkiosk.component';
import { LocksComponent } from './locks/locks.component';
import { PrinterComponent } from './printer/printer.component';
import { UpdatePrinterComponent } from './printer/update-printer/update-printer.component';

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
    path: 'locks',
     component: LocksComponent,
    data: {
      title: 'Locks'
    },
 },
 {
  path: 'update-printer',
   component: UpdatePrinterComponent,
  data: {
    title: 'update-printer'
  },
},

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioskRoutingModule { }
