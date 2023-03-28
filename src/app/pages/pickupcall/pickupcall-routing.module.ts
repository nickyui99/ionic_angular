import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickupcallPage } from './pickupcall.page';

const routes: Routes = [
  {
    path: '',
    component: PickupcallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickupcallPageRoutingModule {}
