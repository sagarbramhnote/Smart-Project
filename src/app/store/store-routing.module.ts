import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { CreatestoreComponent } from './createstore/createstore.component';
import { UpdatestoreComponent } from './updatestore/updatestore.component';

const routes: Routes = [
  {
    path: 'createstore',
     component: CreatestoreComponent,
    data: {
      title: 'Store Management'
    },
    canActivate:[AuthGuard],
    
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
