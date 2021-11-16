import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { Location } from '@angular/common';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { State } from 'src/app/models/state';
import { Client } from 'src/app/models/client';
import { isEqual } from 'lodash';

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit, AfterViewInit {
    editMode: boolean = false;
    editClient!: Client;
    initValues: any;

    @ViewChild(ImageUploadComponent) imageForm!: ImageUploadComponent;
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private firestoreService: FirestoreService,
        private route: ActivatedRoute,
        private state: State,
        private router: Router
    ) {}

    ngAfterViewInit(): void {
        // check for edit mode
        this.route.params.pipe(first()).subscribe((params) => {
            if (params.hasOwnProperty('id')) {
                this.editMode = true;

                let temp = this.state.clients.find(
                    (cli) => cli.id == params['id']
                );

                if (typeof temp !== 'undefined') {
                    this.editClient = temp;
                    console.log(this.editClient);
                    this.form.patchValue(temp);
                    this.initValues = this.form.value;
                    this.imageForm.patchValue(temp.image);
                } else {
                    console.error('No client with given id found');
                    this.router.navigate(['/clients']);
                }
            }
        });
    }

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
            if (this.editMode) {
                if (!isEqual(this.initValues, this.form.value)) {
                    this.editClient = {
                        id: this.editClient.id,
                        image: this.editClient.image,
                        ...this.form.value,
                    };

                    this.writeData(this.editClient);
                } else if (typeof this.imageForm.getFile() !== 'undefined') {
                    this.writeData(this.editClient);
                }
            } else {
                this.writeData(this.form.value);
            }
        }
    }

    writeData(data: any) {
        this.firestoreService
            .setClient(data, this.imageForm.getFile())
            .then((res) => {
                this.location.back();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    removeClient() {
        if (this.editMode) {
            this.firestoreService
                .removeClient(this.editClient.id)
                .then((data) => {
                    this.router.navigate(['/clients']);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    cancelAction() {
        this.location.back();
    }
}
