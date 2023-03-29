import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "./login.page.form";
import {Store} from "@ngrx/store";
import {AppState} from "@capacitor/app";
import {hide, show} from "../../store/loading/loading.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  ngOnInit() {

  }

  forgotEmailPassword(){
    this.store.dispatch(show());

    setTimeout(() => {
      this.store.dispatch(hide());
    }, 3000);
  }

  login(){
    this.router.navigate(['home']);
  }

  register(){
    this.router.navigate(['register'])
  }
}
