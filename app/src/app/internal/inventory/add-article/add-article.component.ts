import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
    selector: 'app-add-article',
    templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
    form!: FormGroup;
    tempBase64: any = '';

    dynamicPlaceholder = {
        finance: {
            buy: '3,99',
            sell: '4,99',
        },
    };
    constructor(
        private fb: FormBuilder,
        private firestoreService: FirestoreService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            brand: [''],
            manufacturer: [''],
            description: ['', Validators.required],
            category: [''],
            ean: [''],
            url: [''],
            inventory: this.fb.group({
                current: [0],
                critical: [0],
            }),
            finance: this.fb.group({
                buy: [0],
                sell: [0],
            }),
        });

        console.log(this.form);
    }

    updatePreview(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            this.tempBase64 = reader.result;
        };
    }

    submit() {
        if (this.form.valid) {
            this.firestoreService
                .setProduct(this.form.value)
                .then((res) => {
                    console.log(res);
                    this.router.navigate(['/inventory']);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}
