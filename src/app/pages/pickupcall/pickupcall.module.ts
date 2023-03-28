import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupcallPageRoutingModule } from './pickupcall-routing.module';

import { PickupcallPage } from './pickupcall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupcallPageRoutingModule
  ],
  declarations: [PickupcallPage]
})
export class PickupcallPageModule {}
