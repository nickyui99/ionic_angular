import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "./login.page.form";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  ngOnInit() {

  }

  login(){
    this.router.navigate(['home']);
  }

  register(){
    this.router.navigate(['register'])
  }
}
