import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupcallsPageRoutingModule } from './pickupcalls-routing.module';

import { PickupcallsPage } from './pickupcalls.page';
import {HomePageModule} from "../home/home.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PickupcallsPageRoutingModule,
        HomePageModule
    ],
  declarations: [PickupcallsPage]
})
export class PickupcallsPageModule {}
