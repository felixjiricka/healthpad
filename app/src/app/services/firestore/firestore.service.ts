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
import { Client } from 'src/app/models/client';

enum ImageFolder {
    PRODUCT = 'products',
    CLIENT = 'clients',
}

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

    initUser(fireUser: any) {
        return new Promise((resolve, reject) => {
            this.getUserData(fireUser.uid)
                .then((data) => {
                    console.log(data);
                    this.state.user = data;

                    Promise.all([this.getProducts(), this.getClients()])
                        .then((res) => {
                            this.state.inventory = res[0];
                            this.state.clients = res[1];
                            resolve(this.state);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

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
                this.storeImage(file, prod.id, ImageFolder.PRODUCT).then(
                    async (link) => {
                        if (link !== null) prod.image = link as string;

                        let userProductRef = this.firestore
                            .collection('products')
                            .doc(this.state.user?.uid);

                        let docSnapshot = await userProductRef
                            .get()
                            .toPromise();

                        if (docSnapshot.exists) {
                            await userProductRef.update({ [prod.id]: prod });
                        } else {
                            await userProductRef.set({ [prod.id]: prod });
                        }

                        // check if need to push
                        this.state.inventory = this.state.inventory.filter(
                            (prd) => prd.id !== prod.id
                        );

                        this.state.inventory.push(prod);

                        resolve(prod);
                    }
                );

                // handle image upload
            } catch (error) {
                reject(error);
            }
        });
    }

    // remove product
    removeProduct(id: string) {
        return new Promise((resolve, reject) => {
            this.removeImage(id, ImageFolder.PRODUCT).then((res) => {
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

    // general methods to add or remove image
    // set product image
    async storeImage(
        file: AngularFireUploadTask,
        id: string,
        folder: ImageFolder
    ) {
        return new Promise((resolve, reject) => {
            console.log(file, id, folder);
            let path = `${this.state.user?.uid}/${folder}/${id}`;

            if (!file || typeof file == 'undefined') {
                console.log('undefined');
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
    removeImage(id: string, folder: ImageFolder) {
        return new Promise((resolve, reject) => {
            let path = `${this.state.user?.uid}/${folder}/${id}`;

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

    // set users
    async setClient(
        client: Client,
        file: AngularFireUploadTask
    ): Promise<Client> {
        return new Promise(async (resolve, reject) => {
            try {
                // check if update product or save new
                if (!client.id) {
                    let id = UUID.UUID();
                    client.id = id;
                }

                // handle product image upload
                this.storeImage(file, client.id, ImageFolder.CLIENT).then(
                    async (link) => {
                        if (link !== null) client.image = link as string;
                        else client.image = '';

                        let userClientsRef = this.firestore
                            .collection('clients')
                            .doc(this.state.user?.uid);

                        let docSnapshot = await userClientsRef
                            .get()
                            .toPromise();

                        if (docSnapshot.exists) {
                            await userClientsRef.update({
                                [client.id]: client,
                            });
                        } else {
                            await userClientsRef.set({
                                [client.id]: client,
                            });
                        }

                        // check if need to push
                        this.state.clients = this.state.clients.filter(
                            (cli) => cli.id !== client.id
                        );

                        this.state.clients.push(client);

                        resolve(client);
                    }
                );

                // handle image upload
            } catch (error) {
                reject(error);
            }
        });
    }

    removeClient(id: string) {
        return new Promise((resolve, reject) => {
            this.removeImage(id, ImageFolder.CLIENT)
                .then((res) => {
                    this.firestore
                        .collection('clients')
                        .doc(this.state.user?.uid)
                        .update({
                            [id]: firebase.default.firestore.FieldValue.delete(),
                        })
                        .then((res) => {
                            this.state.clients = this.state.clients.filter(
                                (cli) => cli.id !== id
                            );
                            resolve(res);
                        })
                        .catch((err) => reject(err));
                })
                .catch((err) => reject(err));
        });
    }

    // get all products
    async getClients(): Promise<Client[]> {
        return new Promise(async (resolve, reject) => {
            this.firestore
                .collection('clients')
                .doc(this.state.user?.uid)
                .ref.get()
                .then(function (doc) {
                    if (doc.exists) {
                        var clients = doc.data() as { string: Client };
                        let data = Object.values(clients).map((el) => {
                            el.birthdate = el.birthdate.toDate();
                            return el;
                        });

                        resolve(data);
                    } else {
                        console.error('No matching clients found');
                        resolve([]);
                    }
                })
                .catch((err) => reject(err));
        });
    }
}
