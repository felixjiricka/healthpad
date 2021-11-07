import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Product } from 'src/app/models/product';
import { UUID } from 'angular2-uuid';
import { State } from 'src/app/models/state';

@Injectable({
    providedIn: 'root',
})
export class FirestoreService {
    constructor(private firestore: AngularFirestore, private state: State) {}

    setUserData(user: User) {
        return new Promise(async (resolve, reject) => {
            try {
                let usersRef = this.firestore.collection('users').doc(user.uid);

                await usersRef.set(user);
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getUserData(uid: string): Promise<User> {
        return new Promise(async (resolve, reject) => {
            this.firestore
                .collection('users')
                .doc(uid)
                .ref.get()
                .then(function (doc) {
                    if (doc.exists) {
                        var userData = doc.data() as User;
                        console.log('User data: ', userData);
                        resolve(userData);
                    } else {
                        console.error('No matching user found');
                        reject();
                    }
                });
        });
    }

    async setProduct(prod: Product): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                let id = UUID.UUID();
                prod.id = id;

                let userProductRef = this.firestore
                    .collection('products')
                    .doc(this.state.user?.uid);

                await userProductRef.update({ [id]: prod });
                this.state.inventory.push(prod);
                resolve(prod);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getProducts(): Promise<Product[]> {
        return new Promise(async (resolve, reject) => {
            this.firestore
                .collection('products')
                .doc(this.state.user?.uid)
                .ref.get()
                .then(function (doc) {
                    if (doc.exists) {
                        var products = doc.data() as { string: Product };
                        resolve(Object.values(products));
                    } else {
                        console.error('No matching products found');
                        reject();
                    }
                });
        });
    }
}
