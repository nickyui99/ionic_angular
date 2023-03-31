import {LoginEffects} from "./login.effects";
import {Observable, of, throwError} from "rxjs";
import {Action, StoreModule} from "@ngrx/store";
import {TestBed} from "@angular/core/testing";
import {recoverPassword, recoverPasswordFail, recoverPasswordSuccess} from "./login.actions";
import {EffectsModule} from "@ngrx/effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {AuthService} from "../../services/auth/auth.service";

describe('Login effects', () => {
    let effects: LoginEffects;
    let actions$: Observable<Action>;
    let error = {error: 'error'};
    let authServiceMock = {
        recoverEmailPassword: (email: string) => {
            if (email == "error@mail.com"){
                return throwError({error: 'error'});
            }
            return of({});
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
        actions$ = of(recoverPassword());

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordSuccess());
            done();
        });
    });

    it('should recover password with not existing email return an error', function (done) {
        actions$ = of(recoverPassword());

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordFail({error}));
            done();
        })
    });
})