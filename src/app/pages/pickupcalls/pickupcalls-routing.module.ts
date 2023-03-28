import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickupcallsPage } from './pickupcalls.page';

const routes: Routes = [
  {
    path: '',
    component: PickupcallsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickupcallsPageRoutingModule {}
