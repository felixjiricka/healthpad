import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userData: any;

    constructor(
        private afAuth: AngularFireAuth,
        private nbAuth: NbAuthService,
        private router: Router
    ) {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
            } else {
                this.userData = null;
            }
            console.log(this.userData);
        });
    }

    SignOut() {
        this.nbAuth
            .logout('email')
            .toPromise()
            .then((data: NbAuthResult) => {
                console.log(data);

                this.userData = null;
                this.router.navigateByUrl('/auth/login');
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
