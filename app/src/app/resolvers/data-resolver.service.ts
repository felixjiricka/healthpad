import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { first } from 'rxjs/operators';
import { Product } from '../models/product';
import { State } from '../models/state';
import { User } from '../models/user';
import { FirestoreService } from '../services/firestore/firestore.service';

@Injectable({
    providedIn: 'root',
})
export class DataResolverService implements Resolve<any> {
    constructor(
        private firestore: FirestoreService,
        private state: State,
        private afAuth: AngularFireAuth
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.authState.pipe(first()).subscribe(async (user) => {
                if (user) {
                    this.firestore
                        .initUser(user)
                        .then((data) => {
                            console.log(data);
                            resolve(true);
                        })
                        .catch((err) => {
                            console.log(err);
                            reject(err);
                        });
                } else {
                    reject({
                        error: 'No user',
                    });
                }
            });
        });
    }
}
