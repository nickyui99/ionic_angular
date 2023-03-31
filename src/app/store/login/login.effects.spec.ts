import {LoginEffects} from "./login.effects";
import {Observable, of, throwError} from "rxjs";
import {Action, StoreModule} from "@ngrx/store";
import {TestBed, waitForAsync} from "@angular/core/testing";
import {
    login,
    loginFail,
    loginSuccess,
    recoverPassword,
    recoverPasswordFail,
    recoverPasswordSuccess
} from "./login.actions";
import {EffectsModule} from "@ngrx/effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../model/user/User";


describe('Login effects', () => {
    let effects: LoginEffects;
    let actions$: Observable<Action>;
    let user = new User();
    user.id = "anyId"
    let error = {error: 'error'};
    let authServiceMock = {
        recoverEmailPassword: (email: string) => {
            if (email == "error@mail.com"){
                return throwError({error: 'error'});
            }
            return of({});
        },
        login: (email: string, password: string) => {
            if (email == "error@mail.com"){
                return throwError(error);
            }
            return of(user);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([
                    LoginEffects
                ])
            ],
            providers: [
                provideMockActions(() => actions$)
            ]
        }).overrideProvider(AuthService, {useValue: authServiceMock});

        effects = TestBed.get(LoginEffects);
    });

    it('should recover password with existing email return success', (done) => {
        actions$ = of(recoverPassword({email: "nicholas10@mail.com"}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordSuccess());
            done();
        });
    });

    it('should recover password with not existing email return an error', function (done) {
        actions$ = of(recoverPassword({email: "error@mail.com"}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordFail({error}));
            done();
        })
    });

    it('should login with valid credentials return success', done => {
        actions$ = of(login({email: "test@mail.com", password: "test12345"}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginSuccess({user}));
            done();
        })
    });

    it('should login with invalid credentials return error message', done => {
        actions$ = of(login({email: "error@mail.com", password: "test12345"}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginFail({error}));
            done();
        })
    });
})