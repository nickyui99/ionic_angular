import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {navigate} from "ionicons/icons";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['login'])
  }

}
