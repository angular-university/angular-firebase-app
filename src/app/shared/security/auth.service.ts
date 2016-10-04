import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import {FirebaseAuth, FirebaseAuthState} from "angularfire2/index";
import {AuthInfo} from "./auth-info";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {


  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);


  constructor(private auth: FirebaseAuth, private router:Router) {

  }




    login(email, password):Observable<FirebaseAuthState> {
        return this.fromFirebaseAuthPromise(this.auth.login({email, password}));
    }


    signUp(email, password) {
        return this.fromFirebaseAuthPromise(this.auth.createUser({email, password}));
    }

    /*
     *
     * This is a demo on how we can 'Observify' any asynchronous interaction
     *
     *
     * */

    fromFirebaseAuthPromise(promise):Observable<any> {

        const subject = new Subject<any>();

        promise
            .then(res => {
                    const authInfo = new AuthInfo(this.auth.getAuth().uid);
                    this.authInfo$.next(authInfo);
                    subject.next(res);
                    subject.complete();
                },
                err => {
                    this.authInfo$.error(err);
                    subject.error(err);
                    subject.complete();
                });

        return subject.asObservable();
    }


    logout() {
        this.auth.logout();
        this.authInfo$.next(AuthService.UNKNOWN_USER);
        this.router.navigate(['/home']);

    }

}
