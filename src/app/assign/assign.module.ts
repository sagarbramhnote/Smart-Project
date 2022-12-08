import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AssignstoreComponent } from './assignstore/assignstore.component';
import { AssignRoutingModule } from './assign-routing.module';
import { AssignUserToStoreComponent } from './assign-user-to-store/assign-user-to-store.component';


@NgModule({
  declarations: [AssignstoreComponent, AssignUserToStoreComponent],
  imports: [
    CommonModule,
    AssignRoutingModule,
    NgbModule,FormsModule,
    NgSelectModule
  ]
})
export class AssignModule { }
