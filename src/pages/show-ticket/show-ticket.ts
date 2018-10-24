import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Http, Headers, Jsonp } from '@angular/http';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import {UpdateTicketsPage} from '../update-tickets/update-tickets';
import {CreateTicketPage} from '../create-ticket/create-ticket';

/**
 * Generated class for the ShowTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-ticket',
  templateUrl: 'show-ticket.html',
})

export class ShowTicketPage {
  status:any;
  priority:Array<Object> = [];
  pendingTickets:Array<Object> = [];
  loginId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public formBuilder:FormBuilder, public modalCtrl: ModalController) {
    this.getUnclearedTickets();
    this.loginId = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowTicketPage');
  }

  getUnclearedTickets()
  {

    this.http.get('http://localhost:8080/suprath/suprath.php?rquest=showTickets').map((res) => res.json()).subscribe(res => {
      if(res.status == "Success")
      {
        this.pendingTickets = res.msg;
        res.msg.map((data) => {
          if(data.priority == 0)
          {
            data.priorityVal = "Low";
          }
          else if(data.priority == 1)
          {
            data.priorityVal = "Medium";
          }
          else{
            data.priorityVal = "High";
          }
          return data;
        })
        console.log(this.pendingTickets);
      }
    })
  }


  createTicketButton()
  {
    let addModal = this.modalCtrl.create(CreateTicketPage, {
      loginId: this.loginId
    });
    addModal.present();
  }

  pressedTickets(ticketNumber)
  {
    this.navCtrl.push(UpdateTicketsPage, {
      ticketId: ticketNumber
    });
  }

}
