import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from 'src/app/models/state';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-add-article',
    templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
    form!: FormGroup;
    tempBase64: any = null;

    autocompleteData: {
        brand: string[];
        manufacturer: string[];
    } = {
        brand: [],
        manufacturer: [],
    };

    filteredBrandValues!: Observable<string[]>;
    filteredManufacturerValues!: Observable<string[]>;

    constructor(
        private fb: FormBuilder,
        private firestoreService: FirestoreService,
        private router: Router,
        private state: State
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

        this.autocompleteData.brand = [
            ...new Set(
                this.state.inventory.map((el) => el.brand)
            ),
        ];
        this.autocompleteData.manufacturer = [
            ...new Set(
                this.state.inventory.map((el) => el.manufacturer)
            ),
        ];

        this.filteredBrandValues = of(this.autocompleteData.brand);
        this.filteredManufacturerValues = of(this.autocompleteData.manufacturer);


        this.filteredBrandValues = this.form.get('brand')!.valueChanges.pipe(
            startWith(''),
            map((filterString) => this.filter(filterString, this.autocompleteData.brand))
        );

        this.filteredManufacturerValues = this.form.get('manufacturer')!.valueChanges.pipe(
            startWith(''),
            map((filterString) => this.filter(filterString, this.autocompleteData.manufacturer))
        );
    }

    private filter(value: string, options: string[]): string[] {
        const filterValue = value.toLowerCase();
        return options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
      }

    updatePreview(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.tempBase64 = reader.result;
        };
    }

    submit() {
        if (this.form.valid) {
            console.log(this.tempBase64);
            this.firestoreService
                .setProduct(this.form.value, this.tempBase64)
                .then((res) => {
                    console.log(res);
                    this.state.inventory.push(res);
                    this.router.navigate(['/inventory']);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}
