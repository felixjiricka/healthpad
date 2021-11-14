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
                        .getUserData(user.uid)
                        .then((userData: User) => {
                            this.state.user = userData;

                            this.firestore
                                .getProducts()
                                .then((inventory: Product[]) => {
                                    this.state.inventory = inventory;
                                    resolve(this.state);
                                })
                                .catch((error) => {
                                    console.error('No user data stored');
                                    reject(error);
                                });
                        })
                        .catch((error) => {
                            console.error('No user data stored');
                            reject(error);
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
