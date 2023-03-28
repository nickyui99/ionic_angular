import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {PickupCallCardComponent} from "../../components/pickup-call-card/pickup-call-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  exports: [
    PickupCallCardComponent
  ],
  declarations: [HomePage, PickupCallCardComponent]
})
export class HomePageModule {}
