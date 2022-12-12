import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatestoreComponent } from './createstore/createstore.component';
import { UpdatestoreComponent } from './updatestore/updatestore.component';

const routes: Routes = [
  {
    path: 'createstore',
     component: CreatestoreComponent,
    data: {
      title: 'Store Management'
    },
    
  },


  {
    path: 'updatestore',
     component: UpdatestoreComponent,
    data: {
      title: 'Update Store'
    },
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
