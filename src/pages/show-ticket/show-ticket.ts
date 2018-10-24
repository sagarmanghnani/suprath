import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, Jsonp } from '@angular/http';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import {UpdateTicketsPage} from '../update-tickets/update-tickets';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public formBuilder:FormBuilder) {
    this.getUnclearedTickets();
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
        this.pendingTickets.map((data) => {
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

  pressedTickets(ticketNumber)
  {
    this.navCtrl.push(UpdateTicketsPage, {
      ticketId: ticketNumber
    });
  }

}
