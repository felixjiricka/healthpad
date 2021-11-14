import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/models/state';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { Observable, of } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { Product } from 'src/app/models/product';
import { isEqual } from 'lodash';
import { Location } from '@angular/common';
@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, AfterViewInit {
    editMode: boolean = false;
    editProduct!: Product;
    initValues: any;

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
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngAfterViewInit(): void {
        // check for edit mode
        this.route.params.pipe(first()).subscribe((params) => {
            if (params.hasOwnProperty('id')) {
                this.editMode = true;

                let temp = this.state.inventory.find(
                    (prod) => prod.id == params['id']
                );

                if (typeof temp !== 'undefined') {
                    this.editProduct = temp;
                    this.form.patchValue(temp);
                    this.initValues = this.form.value;
                    this.imageForm.patchValue(temp.image);
                } else {
                    console.error('No product with given id found');
                    this.router.navigate(['/inventory']);
                }
            }
        });
    }

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
    }

    private filter(value: string, options: string[]): string[] {
        const filterValue = value.toLowerCase();
        return options.filter((optionValue) =>
            optionValue.toLowerCase().includes(filterValue)
        );
    }

    submit() {
        if (this.form.valid) {
            if (this.editMode) {
                if (!isEqual(this.initValues, this.form.value)) {
                    this.editProduct = {
                        id: this.editProduct.id,
                        image: this.editProduct.image,
                        ...this.form.value,
                    };

                    this.writeData(this.editProduct);
                } else if (typeof this.imageForm.getFile() !== 'undefined') {
                    this.writeData(this.editProduct);
                }
            } else {
                this.writeData(this.form.value);
            }
        }
    }

    writeData(data: any) {
        this.firestoreService
            .setProduct(data, this.imageForm.getFile())
            .then((res) => {
                this.location.back();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    removeProduct() {
        if (this.editMode) {
            this.firestoreService
                .removeProduct(this.editProduct.id)
                .then((data) => {
                    this.router.navigate(['/inventory']);
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
