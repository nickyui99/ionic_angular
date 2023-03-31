import {TestBed} from '@angular/core/testing';

import {AuthGuardService} from './auth-guard.service';
import {Store, StoreModule} from "@ngrx/store";

import {AppState} from "../../store/AppState";
import {loginSuccess} from "../../store/login/login.actions";
import {User} from "../../model/user/User";
import {loginReducer} from "../../store/login/login.reducers";
import {Router, RouterModule} from "@angular/router";

describe('AuthGuardService', () => {
  let guard: AuthGuardService;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterModule.forRoot([]),
          StoreModule.forRoot([]),
          StoreModule.forFeature("login", loginReducer),
      ]
    });
    guard = TestBed.inject(AuthGuardService);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  it('should allow logged user to access page', () => {
    store.dispatch(loginSuccess({user: new User()}))
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    });
  });

  it('should not allow access to page if user is not logged in', function () {
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeFalsy();
    });
  });

  it('should not allowed user be sent to the login page', function () {
    spyOn(router, 'navigateByUrl');

    guard.canLoad().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    })
  });

});
