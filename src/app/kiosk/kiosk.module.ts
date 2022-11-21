import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KioskRoutingModule } from './kiosk-routing.module';
import { CreatekioskComponent } from './createkiosk/createkiosk.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BillValidatorComponent } from './bill-validator/bill-validator.component';
import { PrinterComponent } from './printer/printer.component';
import { LocksComponent } from './locks/locks.component';

@NgModule({
  declarations: [CreatekioskComponent, BillValidatorComponent, PrinterComponent, LocksComponent],
  imports: [
    CommonModule,
    KioskRoutingModule,
    NgbModule,
    FormsModule,
    NgSelectModule
  ]
})
export class KioskModule { }
