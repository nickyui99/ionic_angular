import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {recoverPassword, recoverPasswordFail, recoverPasswordSuccess} from "./login.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class LoginEffects{
    constructor(private action$: Actions, private authService: AuthService) {

    }

    recoverPassword$ = createEffect(() => {
        return this.action$.pipe(
            ofType(recoverPassword),
            switchMap(() => this.authService.recoverEmailPassword("valid@email.com").pipe(
                map(() => recoverPasswordSuccess()),
                catchError(error => of(recoverPasswordFail({error})))
            ))
        );
    })
}
