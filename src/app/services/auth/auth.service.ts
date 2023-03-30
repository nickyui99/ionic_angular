import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

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
}
