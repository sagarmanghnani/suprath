import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, Jsonp } from '@angular/http';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: FormGroup;
  constructor(public navCtrl: NavController, public http: Http, public formBuilder:FormBuilder) {
      this.user = formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        phone:['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        email:['', Validators.compose([Validators.required, Validators.email])],
        fullName:['', Validators.required]
      });
  }


  signUp()
  {
    var data = {
      fullName:this.user.get('fullName').value,
      username:this.user.get('username').value,
      password:this.user.get('password').value,
      email:this.user.get('email').value,
      phone:this.user.get('phone').value,
    };
    console.log(data);

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    this.http.post('http://localhost:8080/suprath/suprath.php?rquest=signUp', JSON.stringify(data), {headers:headers}).map(res => res.json()).subscribe(res => {
      if(res.status = "Success")
      {
        console.log(res);
      }
    });
    
  }
}
