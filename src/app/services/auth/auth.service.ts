import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/user/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword,} from "firebase/auth";
import {getAuth, } from "@angular/fire/auth";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/AppState";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private fAuth: AngularFireAuth, private store: Store<AppState>) {}

    public authListener() : Observable<boolean>{
        return new Observable<any>(observer => {
            return this.fAuth.authState.subscribe(user => {
                observer.next(!!user);
                observer.complete();
            });
        });
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
            let auth = getAuth();
            setPersistence(auth, browserLocalPersistence)
                .then(() => {
                    signInWithEmailAndPassword(auth, email, password)
                        .then((firebaseUser) => {
                            observer.next({email: email, id: firebaseUser.user?.uid, password});
                            observer.complete();
                        })
                        .catch(err => {
                            observer.error(err);
                            observer.complete();
                        });
                }).catch(err => {
                    console.log(err);
            })
        })

    }
}
