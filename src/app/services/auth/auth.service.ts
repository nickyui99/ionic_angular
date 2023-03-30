import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/user/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public recoverEmailPassword(email: String) : Observable<void>{
    return new Observable<void>(observer => {
      setTimeout(() => {
        if(email == "error@mail.com"){
          observer.error({message: "Email not found"});
        }
        observer.next();
        observer.complete();
      }, 3000)
    })
  }

  public login(email: string, password: string): Observable<User> {
    return new Observable<User>( observer => {
      setTimeout(() => {
        if(email == 'error@mail.com'){
          observer.error({message: "User not found"});
          observer.next();
          observer.complete();
        } else {
          const user = new User();
          user.email = email;
          user.id = "userId";
          observer.next(user);
        }
      }, 3000);
    });
  }
}
