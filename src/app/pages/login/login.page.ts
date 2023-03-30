import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginPageForm} from "./login.page.form";
import {Store} from "@ngrx/store";
import {AppState} from "@capacitor/app";
import {login, recoverPassword} from "../../store/login/login.actions";
import {hide, show} from "../../store/loading/loading.actions";
import {ToastController} from "@ionic/angular";
import {LoginState} from "../../store/login/LoginState";
import {Subscription} from "rxjs";

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
  ) {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  ngOnInit() {
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

  // private onIsLoggingIn(loginState: LoginState){
  //   if (loginState.isLoggingIn){
  //     const email = this.form.get('email')?.value;
  //     const password = this.form.get('password')?.value;
  //     this.authService.login(email,password).subscribe(user => {
  //       this.store.dispatch(loginSuccess({user}));
  //     }, (error) => {
  //       this.store.dispatch(loginFail({error}));
  //     })
  //   }
  // }

  private onIsLoggedIn(loginState:LoginState){
    if(loginState.isLoggedIn){
      this.router.navigate(['home']);
    }
  }

  // private async onIsRecoveringPassword(loginState: LoginState){
  //   if (loginState.isRecoveringPassword) {
  //     console.log("is recovering password");
  //
  //     this.authService.recoverEmailPassword(this.form.get('email')?.value).subscribe(() => {
  //       this.store.dispatch(recoverPasswordSuccess());
  //
  //     }, error => this.store.dispatch(recoverPasswordFail({error})) )
  //   }
  // }

  private async onError(loginState: LoginState){

    if(loginState.error){
      console.log("is recover password fail");
      try {
        const toast = await this.toastController.create({
          message: loginState.error.message,
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
          message: 'An reset password Email has been sent to your mailbox.',
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
    this.store.dispatch(recoverPassword());
  }

  login(){
    this.store.dispatch(login());
  }

  register(){
    this.router.navigate(['register'])
  }
}
