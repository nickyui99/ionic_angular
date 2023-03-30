import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/user/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private fAuth: AngularFireAuth) {
    }

    public recoverEmailPassword(email: string): Observable<void> {
        return new Observable<void>(observer => {
            this.fAuth.sendPasswordResetEmail(email)
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch(err => {
                    observer.error(err);
                    observer.complete();
                });
        })
    }

    public login(email: string, password: string): Observable<User> {
        return new Observable<User>((observer) => {
            this.fAuth.signInWithEmailAndPassword(email, password)
                .then((firebaseUser) => {
                    observer.next({email: email, id: firebaseUser.user?.uid, password});
                    observer.complete();
                }).catch(err => {
                observer.error(err);
                observer.complete();
            });
        });
    }
}
