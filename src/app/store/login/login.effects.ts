import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
    login,
    loginFail,
    loginSuccess,
    recoverPassword,
    recoverPasswordFail,
    recoverPasswordSuccess
} from "./login.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class LoginEffects{
    constructor(private action$: Actions, private authService: AuthService) {}

    recoverPassword$ = createEffect(() => {
        return this.action$.pipe(
            ofType(recoverPassword),
            switchMap((payload: {email: string}) => this.authService.recoverEmailPassword(payload.email).pipe(
                map(() => recoverPasswordSuccess()),
                catchError(error => of(recoverPasswordFail({error})))
            ))
        );
    });

    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(login),
            switchMap((payload: {email: string, password: string}) => this.authService.login(payload.email, payload.password).pipe(
                map((user) => loginSuccess({user})),
                catchError(error => of(loginFail({error})))
            ))
        );
    })
}
