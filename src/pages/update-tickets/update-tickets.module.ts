import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateTicketsPage } from './update-tickets';

@NgModule({
  declarations: [
    UpdateTicketsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateTicketsPage),
  ],
})
export class UpdateTicketsPageModule {}
