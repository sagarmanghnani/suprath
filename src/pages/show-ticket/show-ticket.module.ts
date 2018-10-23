import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowTicketPage } from './show-ticket';

@NgModule({
  declarations: [
    ShowTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowTicketPage),
  ],
})
export class ShowTicketPageModule {}
