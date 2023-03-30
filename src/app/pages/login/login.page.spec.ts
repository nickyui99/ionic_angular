import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule, ToastController} from '@ionic/angular';

import {LoginPage} from './login.page';
import {Router} from "@angular/router";
import {AppRoutingModule} from "../../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {Store, StoreModule} from "@ngrx/store";
import {loadingReducer} from "../../store/loading/loading.reducers";
import {loginReducer} from "../../store/login/login.reducers";
import {AppState} from "../../store/AppState";
import {recoverPassword, recoverPasswordFail, recoverPasswordSuccess} from "../../store/login/login.actions";
import {AppStoreModule} from "../../store/AppStoreModule";
import {LoginState} from "../../store/login/LoginState";

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    let router: Router;
    let store: Store<AppState>;
    let toastController: ToastController;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPage],
            imports: [
                IonicModule.forRoot(),
                AppRoutingModule,
                ReactiveFormsModule,
                AppStoreModule,
                StoreModule.forRoot([]),
                StoreModule.forFeature("loading", loadingReducer),
                StoreModule.forFeature("login", loginReducer)
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginPage);
        router = TestBed.get(Router);
        store = TestBed.get(Store);
        toastController = TestBed.get(ToastController);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create form on init', () => {
        component.ngOnInit();

        expect(component.form).not.toBeUndefined();
    });

    // it('should go to the home page', () => {
    //     spyOn(router, 'navigate');
    //     component.login();
    //     expect(router.navigate).toHaveBeenCalledWith(['home']);
    // });

    it('should go to the registration page', () => {
        spyOn(router, 'navigate');
        component.register();
        expect(router.navigate).toHaveBeenCalledWith(['register']);
    });

    it('should recover email/password on forgot email/password', function () {
        fixture.detectChanges();
        component.form.get('email')?.setValue('valid@email.com');
        fixture.debugElement.nativeElement.querySelector('#recoverPasswordButton').click();
        store.select('login').subscribe(loginState => {
            expect(loginState.isRecoveringPassword).toBeTruthy();
        });
    });

    it('should show loading when recovering password', function () {
        fixture.detectChanges();
        store.dispatch(recoverPassword());
        store.select('loading').subscribe(loadingState => {
            expect(loadingState.show).toBeTruthy();
        });
    });

    it('should hide loading and show success message when has recovered password', function () {
        spyOn(toastController, 'create');

        fixture.detectChanges();
        store.dispatch(recoverPassword());
        store.dispatch(recoverPasswordSuccess());
        store.select('loading').subscribe(loadingState => {
            expect(loadingState.show).toBeFalsy();
        });

        expect(toastController.create).toHaveBeenCalledTimes(1);
    });

    it('should hide loading and show error message when error on recover password', () => {
        spyOn(toastController, 'create');

        fixture.detectChanges();
        store.dispatch(recoverPassword());
        store.dispatch(recoverPasswordFail({error: "message"}));
        store.select('loading').subscribe(loadingState => {
            expect(loadingState.show).toBeFalsy();
        });

        expect(toastController.create).toHaveBeenCalledTimes(1);
    });

    it("should show loading and start login when logging in", () => {
        fixture.detectChanges();

        component.form.get('email')?.setValue('valid@mail.com');
        component.form.get('password')?.setValue('anyPassword');

        fixture.debugElement.nativeElement.querySelector('#loginButton').click();

        store.select('loading').subscribe(loadingState => {
            expect(loadingState.show).toBeTruthy();
        });

        store.select('login').subscribe(loginState => {
            expect(loginState.isLoggingIn).toBeTruthy();
        })
    });

    it('should hide loading and send user to home page when user has logged in', function () {
        fixture.detectChanges();

        component.form.get('email')?.setValue('valid@mail.com');
        component.form.get('password')?.setValue('anyPassword');
        fixture.debugElement.nativeElement.querySelector('#loginButton').click();

        store.select('loading').subscribe(loadingState => {
            expect(loadingState.show).toBeTruthy();
        });
        store.select('login').subscribe((loginState:LoginState) => {
            expect(loginState.isLoggedIn).toBeTruthy();
        });


    });
});
