import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { Location } from '@angular/common';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
    editMode: boolean = false;

    @ViewChild(ImageUploadComponent) imageForm!: ImageUploadComponent;
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private firestoreService: FirestoreService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: this.fb.group({
                first: ['', Validators.required],
                sur: ['', Validators.required],
            }),
            birthdate: ['', Validators.required],
            contact: this.fb.group({
                tel: [''],
                mail: [''],
            }),
            address: this.fb.group({
                street: [''],
                number: [''],
                additional: [''],
                postal: [''],
                city: [''],
            }),
            notes: [''],
            medicalHistory: [''],
        });
    }

    submit() {
        if (this.form.valid) {
            this.firestoreService
                .setClient(this.form.value, this.imageForm.getFile())
                .then((res) => {
                    this.location.back();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('not valid');
        }
    }

    cancelAction() {
        this.location.back();
    }
}
