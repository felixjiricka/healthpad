import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class FirestoreService {
    constructor(private firestore: AngularFirestore) {}

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
}
