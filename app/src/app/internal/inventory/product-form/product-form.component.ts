import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/models/state';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Observable, of } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
    @ViewChild(ImageUploadComponent) imageForm!: ImageUploadComponent;
    form!: FormGroup;

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
        private state: State,
        private route: ActivatedRoute
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
            ...new Set(this.state.inventory.map((el) => el.brand)),
        ];
        this.autocompleteData.manufacturer = [
            ...new Set(this.state.inventory.map((el) => el.manufacturer)),
        ];

        this.filteredBrandValues = of(this.autocompleteData.brand);
        this.filteredManufacturerValues = of(
            this.autocompleteData.manufacturer
        );

        this.filteredBrandValues = this.form.get('brand')!.valueChanges.pipe(
            startWith(''),
            map((filterString) =>
                this.filter(filterString, this.autocompleteData.brand)
            )
        );

        this.filteredManufacturerValues = this.form
            .get('manufacturer')!
            .valueChanges.pipe(
                startWith(''),
                map((filterString) =>
                    this.filter(
                        filterString,
                        this.autocompleteData.manufacturer
                    )
                )
            );

        this.route.params.pipe(first()).subscribe((params) => {
            console.log(params);
        });
    }

    private filter(value: string, options: string[]): string[] {
        const filterValue = value.toLowerCase();
        return options.filter((optionValue) =>
            optionValue.toLowerCase().includes(filterValue)
        );
    }

    submit() {
        if (this.form.valid) {
            this.firestoreService
                .setProduct(this.form.value, this.imageForm.getBase64())
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

    cancelAction() {
        this.router.navigate(['/inventory']);
    }
}
