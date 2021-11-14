import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Product } from 'src/app/models/product';
import { UUID } from 'angular2-uuid';
import { State } from 'src/app/models/state';
import {
    AngularFireStorage,
    AngularFireUploadTask,
} from '@angular/fire/storage';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root',
})
export class FirestoreService {
    constructor(
        private firestore: AngularFirestore,
        private state: State,
        private firestorage: AngularFireStorage,
        private afAuth: AngularFireAuth
    ) {}

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
                .then(async (doc) => {
                    if (doc.exists) {
                        var userData = doc.data() as User;
                        userData.email =
                            (await this.afAuth.currentUser)!.email || '';
                        console.log('User data: ', userData);
                        resolve(userData);
                    } else {
                        console.error('No matching user found');
                        reject();
                    }
                });
        });
    }

    // set product data
    async setProduct(
        prod: Product,
        file: AngularFireUploadTask
    ): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                // check if update product or save new
                if (!prod.id) {
                    let id = UUID.UUID();
                    prod.id = id;
                }

                // handle product image upload
                this.setProductImage(file, prod.id).then(async (link) => {
                    if (link !== null) prod.image = link as string;

                    let userProductRef = this.firestore
                        .collection('products')
                        .doc(this.state.user?.uid);

                    await userProductRef.update({ [prod.id]: prod });

                    // check if need to push
                    this.state.inventory = this.state.inventory.filter(
                        (prd) => prd.id !== prod.id
                    );

                    this.state.inventory.push(prod);

                    resolve(prod);
                });

                // handle image upload
            } catch (error) {
                reject(error);
            }
        });
    }

    // set product image
    async setProductImage(file: AngularFireUploadTask, id: string) {
        return new Promise((resolve, reject) => {
            let path = `${this.state.user?.uid}/products/${id}`;

            if (!file || typeof file === 'undefined') {
                resolve(null);
                return;
            } else {
                this.firestorage
                    .ref(path)
                    .put(file)
                    .then((val) => {
                        // get url once
                        this.firestorage
                            .ref(path)
                            .getDownloadURL()
                            .pipe(first())
                            .subscribe((link) => {
                                resolve(link);
                            });
                    })
                    .catch((err) => {
                        console.error('err in setProductImage', err);
                        resolve(err);
                    });
            }
        });
    }

    // remove product image
    removeProductImage(id: string) {
        return new Promise((resolve, reject) => {
            let path = `${this.state.user?.uid}/products/${id}`;

            this.firestorage
                .ref(path)
                .getDownloadURL()
                .toPromise()
                .then((res) => {
                    this.firestorage
                        .ref(path)
                        .delete()
                        .pipe(first())
                        .subscribe((res) => resolve(res));
                })
                .catch((err) => resolve({}));
        });
    }

    // remove product
    removeProduct(id: string) {
        return new Promise((resolve, reject) => {
            this.removeProductImage(id).then((res) => {
                this.firestore
                    .collection('products')
                    .doc(this.state.user?.uid)
                    .update({
                        [id]: firebase.default.firestore.FieldValue.delete(),
                    })
                    .then((res) => {
                        this.state.inventory = this.state.inventory.filter(
                            (prod) => prod.id !== id
                        );
                        resolve(res);
                    })
                    .catch((err) => reject(err));
            });
        });
    }

    // get all products
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
