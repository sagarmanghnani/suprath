import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Http, Headers, Jsonp } from '@angular/http';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import {ShowTicketPage} from '../show-ticket/show-ticket';

/**
 * Generated class for the CreateTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-ticket',
  templateUrl: 'create-ticket.html',
})
export class CreateTicketPage {

  createTicket:FormGroup
  ownerArray:Array<Object> = [];
  showOwner:any;
  orignalOwner:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public formBuilder:FormBuilder, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.createTicket = formBuilder.group({
        ticketStatus:[''],
        priority:[''],
        ticketDescription: ['', Validators.required],
        Owner:['', Validators.required],
        raisedBy: ['']
    });
    this.getOwners();
    this.orignalOwner = this.navParams.get('loginId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTicketPage');
  }

  getOwners()
  {
    this.http.get('http://localhost:8080/suprath/suprath.php?rquest=getOwner').map(res => res.json()).subscribe((res) => {
        if(res.status == "Success")
        {
          this.ownerArray = res.msg;
          console.log(this.ownerArray);
        }
    })
  }

  createnewTickets()
  {
    var data = {
      ticketStatus : this.createTicket.get('ticketStatus').value,
      priority: this.createTicket.get('priority').value,
      ticketDescription: this.createTicket.get('ticketDescription').value,
      Owner: this.createTicket.get('Owner').value,
      originallyOwned: this.orignalOwner,
      raisedBy: this.createTicket.get('raisedBy').value,
    }
    console.log(data);
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post('http://localhost:8080/suprath/suprath.php?rquest=createTicket', JSON.stringify(data), {headers:headers}).map(res => res.json()).subscribe(res => {
      if(res.status == "Success")
      {
        this.navCtrl.push(ShowTicketPage);
      }
    });
  }

  closeModal()
  {
    this.viewCtrl.dismiss();
  }

}
