import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Product } from 'src/app/models/product';
import { UUID } from 'angular2-uuid';
import { State } from 'src/app/models/state';
import { AngularFireStorage } from '@angular/fire/storage';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class FirestoreService {
    constructor(
        private firestore: AngularFirestore,
        private state: State,
        private firestorage: AngularFireStorage
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

    async setProduct(prod: Product, base64: any): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                let id = UUID.UUID();
                prod.id = id;

                // handle product image upload
                this.setProductImage(base64, id).then(async (link) => {
                    if (link !== null) prod.image = link as string;

                    let userProductRef = this.firestore
                        .collection('products')
                        .doc(this.state.user?.uid);

                    await userProductRef.update({ [id]: prod });
                    resolve(prod);
                });

                // handle image upload
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    async setProductImage(base64: any, id: string) {
        return new Promise((resolve, reject) => {
            let path = `${this.state.user?.uid}/products/${id}`;

            if (base64 == null) {
                console.log('empty image');
                resolve(null);
                return;
            } else {
                this.firestorage
                    .ref(path)
                    .putString(base64, 'data_url', { contentType: 'image/jpg' })
                    .then((val) => {
                        // get url once
                        this.firestorage
                            .ref(path)
                            .getDownloadURL()
                            .pipe(first())
                            .subscribe((link) => {
                                console.log(link);
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
