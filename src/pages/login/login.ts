import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, Jsonp } from '@angular/http';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import {CreateTicketPage} from '../create-ticket/create-ticket';
import {ShowTicketPage} from '../show-ticket/show-ticket';
import { Storage } from '@ionic/storage';
import {HomePage} from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login:FormGroup
  error: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public formBuilder:FormBuilder, public storage:Storage) {
    this.login = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logintoUser()
  {
    let data = {
      username: this.login.get('username').value,
      password: this.login.get('password').value
    }
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post('http://localhost:8080/suprath/suprath.php?rquest=login', JSON.stringify(data), {headers:headers}).map(res => res.json()).subscribe((res) => {
      if(res.status == "Success")
      {
        this.storage.set("loginId", res.id);
        this.navCtrl.push(ShowTicketPage, {
          id:res.id
        })
      }
      else
      {
        this.error = res.msg;
      }
    });
  }

  test()
  {
    this.navCtrl.push(HomePage);
  }
}
