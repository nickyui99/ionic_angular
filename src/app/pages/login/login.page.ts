import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "./login.page.form";
import {Store} from "@ngrx/store";
import {AppState} from "@capacitor/app";
import {login, loginSuccess, recoverPassword} from "../../store/login/login.actions";
import {hide, show} from "../../store/loading/loading.actions";
import {ToastController} from "@ionic/angular";
import {LoginState} from "../../store/login/LoginState";
import {Subscription} from "rxjs";
import {User} from "../../model/user/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {navigate} from "ionicons/icons";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  loginStateSubscription: Subscription | undefined;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private store: Store<AppState>,
      private toastController: ToastController,
      private fAuth: AngularFireAuth
  ) {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  ngOnInit() {

    if(this.fAuth.authState){
      console.log("loginSuccess");
      loginSuccess({user: new User()});
      this.router.navigate(['home']);
    }
    // @ts-ignore
    const loginStateSubscription = this.store.select("login").subscribe((loginState: LoginState)=> {
      console.log(loginState);
      this.onIsRecoveredpassword(loginState);
      this.onIsLoggedIn(loginState);
      this.onError(loginState);
      this.toggleLoading(loginState);
    });
  }

  ngOnDestroy() {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(loginState: LoginState){
    if (loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    }
    else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState:LoginState){
    if(loginState.isLoggedIn){
      this.router.navigate(['home']);
    }
  }

  private async onError(loginState: LoginState){

    if(loginState.error){
      console.log("is recover password fail");
      try {
        console.log(loginState.error.message.Firebase);
        const toast = await this.toastController.create({
          message: loginState.error.message.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, ''),
          duration: 1500,
          position: "bottom",
          color: "danger"
        });
        await toast.present();
      } catch (err) {
        console.error(err);
      }
    }
  }

  private async onIsRecoveredpassword(loginState: LoginState){
    if (loginState.isRecoveredPassword) {
      console.log("is recovered password");
      try {
        const toast = await this.toastController.create({
          message: 'An reset password email has been sent to your mailbox.',
          duration: 1500,
          position: "bottom",
          color: "primary"
        });
        await toast.present();
      } catch (err) {
        console.error(err);
      }
    }
  }

  forgotEmailPassword(){
    this.store.dispatch(recoverPassword({ email: this.form.get('email')?.value }));
  }

  login(){
    this.store.dispatch(login({
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }));
  }

  register(){
    this.router.navigate(['register'])
  }
}
