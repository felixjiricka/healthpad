import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { first } from 'rxjs/operators';
import { FirestoreService } from '../firestore/firestore.service';
import { State } from 'src/app/models/state';
import { Product } from 'src/app/models/product';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private firestore: FirestoreService,
        private nbAuth: NbAuthService,
        private router: Router,
        private state: State
    ) {
        this.afAuth.authState.subscribe(async (user) => {
            if (user) {
                console.log(user);
            } else {
                delete this.state.user;
            }
        });
    }

    SignOut() {
        this.nbAuth
            .logout('email')
            .toPromise()
            .then((data: NbAuthResult) => {
                console.log(data);

                delete this.state.user;
                this.router.navigateByUrl('/auth/login');
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
