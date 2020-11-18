import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeekSchedulePageRoutingModule } from './week-schedule-routing.module';

import { WeekSchedulePage } from './week-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeekSchedulePageRoutingModule
  ],
  declarations: [WeekSchedulePage]
})
export class WeekSchedulePageModule {}
