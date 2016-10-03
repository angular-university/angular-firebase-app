import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {FirebaseAuth, FirebaseAuthState} from "angularfire2/index";

@Injectable()
export class AuthService {


  constructor(private auth: FirebaseAuth) {

  }




    login(email, password):Observable<FirebaseAuthState> {

        return this.fromFirebaseAuthPromise(this.auth.login({email, password}));

    }


    fromFirebaseAuthPromise(promise):Observable<any> {

        const subject = new Subject<any>();

        promise
            .then(res => {
                    subject.next(res);
                    subject.complete();
                },
                err => {
                    subject.error(err);
                    subject.complete();
                });

        return subject.asObservable();
    }


}
