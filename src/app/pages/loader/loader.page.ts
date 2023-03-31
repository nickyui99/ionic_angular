import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {navigate} from "ionicons/icons";
import {loginSuccess} from "../../store/login/login.actions";
import {User} from "../../model/user/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private router: Router, private fAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.router.navigate(['home']);
  }

}
