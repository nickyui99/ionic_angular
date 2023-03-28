import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pickupcall',
  templateUrl: './pickupcall.page.html',
  styleUrls: ['./pickupcall.page.scss'],
})
export class PickupcallPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCreatePickupCall(){
    this.router.navigate(['home']);
  }

}
