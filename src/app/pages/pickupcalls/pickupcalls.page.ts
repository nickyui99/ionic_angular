import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pickupcalls',
  templateUrl: './pickupcalls.page.html',
  styleUrls: ['./pickupcalls.page.scss'],
})
export class PickupcallsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
