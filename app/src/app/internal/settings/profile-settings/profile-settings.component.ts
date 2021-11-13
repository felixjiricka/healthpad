import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from 'src/app/models/state';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
    profileForm!: FormGroup;
    constructor(
        private state: State,
        private fb: FormBuilder,
        private firestoreService: FirestoreService
    ) {}

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: [{ value: '', disabled: true }, Validators.required],
        });

        this.profileForm.patchValue({
            firstName: this.state.user?.firstName,
            lastName: this.state.user?.lastName,
            email: this.state.user?.email,
        });
    }

    submit() {
        if (this.profileForm.valid && this.state.user) {
            let user = this.state.user;
            user.firstName = this.profileForm.value.firstName;
            user.lastName = this.profileForm.value.lastName;

            this.firestoreService
                .setUserData(user)
                .then(() => {
                    this.state.user = user;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}
