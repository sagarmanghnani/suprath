import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';import { Http, Headers, Jsonp } from '@angular/http';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';
/**
 * Generated class for the UpdateTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-tickets',
  templateUrl: 'update-tickets.html',
})
export class UpdateTicketsPage {

  ticketNumber:any;
  ownerArray:Array<Object> = [];
  updateTickets:FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams ,public http:Http, public formBuilder:FormBuilder, public view:ViewController ) {
    this.updateTickets = formBuilder.group({
      ticketStatus:[''],
      priority:[''],
      ticketDescription: [''],
      Owner:[''],
      raisedBy: ['']
  });
    
    this.ticketNumber = this.navParams.get('ticketId');
    this.getOwners();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateTicketsPage');
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

  updateTicket()
  {
    var data = {
      ticketStatus : this.updateTickets.get('ticketStatus').value,
      priority: this.updateTickets.get('priority').value,
      ticketDescription: this.updateTickets.get('ticketDescription').value,
      Owner: this.updateTickets.get('Owner').value,
      raisedBy: this.updateTickets.get('raisedBy').value,
      ticketNumber: 2
    }

    console.log(data);
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post('http://localhost:8080/suprath/suprath.php?rquest=updateTicket', JSON.stringify(data), {headers:headers}).map(res => res.json()).subscribe(res => {
      console.log(res);
    })
  }

  closeModal()
  {
    this.view.dismiss();
  }

}
