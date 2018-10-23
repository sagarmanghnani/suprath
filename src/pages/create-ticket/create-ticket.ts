import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, Jsonp } from '@angular/http';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public formBuilder:FormBuilder) {
    this.createTicket = formBuilder.group({
        ticketStatus:[''],
        priority:[''],
        ticketDescription: ['', Validators.required],
        Owner:['', Validators.required],
        originallyOwned:['', Validators.required]
    });
    this.getOwners();
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
      originallyOwned: this.createTicket.get('originallyOwned').value,
    }
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post('http://localhost:8080/suprath/suprath.php?rquest=getOwner', JSON.stringify(data), {headers:headers}).map(res => res.json()).subscribe(res => {
      console.log(res);
    })
  }


}
