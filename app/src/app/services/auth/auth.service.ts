import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NbAuthService } from '@nebular/auth';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userData: any;

    constructor(
        private afAuth: AngularFireAuth,
        private nbAuth: NbAuthService
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
        this.nbAuth.logout('email');
    }
}
