import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginState} from "../../store/login/LoginState";
import {User} from "../../model/user/User";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/AppState";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select("login").subscribe((loginState: LoginState)=> {
      console.log(loginState);
    });
  }

  seeAll(){
    this.router.navigate(['pickupcalls']);
  }

  createPickupCall() {
    this.router.navigate(['pickupcall']);
  }

}
