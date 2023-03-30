import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "./login.page.form";
import {Store} from "@ngrx/store";
import {AppState} from "@capacitor/app";
import {recoverPassword} from "../../store/login/login.actions";
import {hide, show} from "../../store/loading/loading.actions";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private store: Store<AppState>,
      private toastController: ToastController
  ) {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  ngOnInit() {
    // @ts-ignore
    this.store.select("login").subscribe(async (loginState:any)=> {
      if (loginState.isRecoveringPassword) {
        this.store.dispatch(show());
      }

      if (loginState.isRecoveredPassword) {
        this.store.dispatch(hide());
        try {
          const toast = await this.toastController.create({
            message: 'Hello World!',
            duration: 1500,
            position: "bottom"
          });
          await toast.present();
        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  forgotEmailPassword(){
    this.store.dispatch(show());
    this.store.dispatch(recoverPassword());
  }

  login(){
    this.router.navigate(['home']);
  }

  register(){
    this.router.navigate(['register'])
  }
}
