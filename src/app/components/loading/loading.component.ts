import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {LoadingState} from "../../store/loading/LoadingState";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent  implements OnInit {

  loadingState$: Observable<LoadingState> | undefined

  constructor(private store: Store<{ loading: LoadingState }>) {

  }

  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }

}
