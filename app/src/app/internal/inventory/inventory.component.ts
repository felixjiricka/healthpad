import { ProductCategory } from './../../models/productCategory';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
    filterForm!: FormGroup;
    constructor() {}

    ngOnInit(): void {
        this.filterForm = new FormGroup({
            productCategories: new FormArray([]),
            inventory: new FormGroup({
                min: new FormControl(),
                max: new FormControl(),
            }),
            onlyCriticalInventory: new FormControl(false),
        });

        this.productCategories.forEach(() =>
            (this.filterForm.controls.productCategories as FormArray).push(
                new FormControl(false)
            )
        );

        // filter all products
        this.filterForm.valueChanges.subscribe((val) => {
            let appliedFilters = val;
            appliedFilters.productCategories =
                this.filterForm.value.productCategories
                    .map((checked: any, i: any) =>
                        checked ? this.productCategories[i].id : null
                    )
                    .filter((v: any) => v !== null);

            console.log(appliedFilters);

            this.onSearch();
            this.filteredProducts = this.products.filter((prod) => {
                if (
                    appliedFilters.onlyCriticalInventory &&
                    prod.inventory.current > prod.inventory.critical
                ) {
                    return false;
                }

                if (
                    appliedFilters.productCategories.length > 0 &&
                    !appliedFilters.productCategories.includes(prod.category)
                ) {
                    return false;
                }

                if (
                    appliedFilters.inventory.min !== null &&
                    prod.inventory.current < appliedFilters.inventory.min
                ) {
                    return false;
                }

                if (
                    appliedFilters.inventory.max !== null &&
                    prod.inventory.current > appliedFilters.inventory.max
                ) {
                    return false;
                }

                return true;
            });
        });
    }

    productCategories: ProductCategory[] = [
        { id: 1, name: 'Tapes' },
        { id: 2, name: 'Bachblüten' },
        { id: 3, name: 'Sonstiges' },
    ];

    products: Product[] = [
        {
            id: 1,
            name: 'Schüssler Salze Nummer 1',
            description: '',
            url: '',
            image: 'https://cdn.shop-apotheke.at/images/420x0/adler-schuessler-salze-nr-7-magnesium-phosphoricum-d6-tabletten-A2262276-p10.webp',
            inventory: {
                current: 10,
                critical: 2,
            },
            ean: 1234234,
            brand: 'Marke',
            manufacturer: 'Hersteller',
        },
        {
            id: 2,
            name: 'Schüssler Salze Nummer 1',
            description: '',
            url: '',
            image: 'https://cdn.shop-apotheke.at/images/420x0/adler-schuessler-salze-nr-7-magnesium-phosphoricum-d6-tabletten-A2262276-p10.webp',
            inventory: {
                current: 8,
                critical: 2,
            },
            ean: 1234234,
            brand: 'Marke',
            manufacturer: 'Hersteller',
        },
        {
            id: 3,
            name: 'Schüssler Salze Nummer 1',
            description: '',
            url: '',
            image: 'https://cdn.shop-apotheke.at/images/420x0/adler-schuessler-salze-nr-7-magnesium-phosphoricum-d6-tabletten-A2262276-p10.webp',
            inventory: {
                current: 10,
                critical: 2,
            },
            ean: 1234234,
            brand: 'Marke',
            manufacturer: 'Hersteller',
        },
        {
            id: 4,
            name: 'Schüssler Salze Nummer 1',
            description: '',
            url: '',
            image: 'https://cdn.shop-apotheke.at/images/420x0/adler-schuessler-salze-nr-7-magnesium-phosphoricum-d6-tabletten-A2262276-p10.webp',
            inventory: {
                current: 16,
                critical: 2,
            },
            ean: 1234234,
            brand: 'Marke',
            manufacturer: 'Hersteller',
        },
        {
            id: 5,
            name: 'Schüssler Salze Nummer 1',
            description: '',
            url: '',
            image: 'https://cdn.shop-apotheke.at/images/420x0/adler-schuessler-salze-nr-7-magnesium-phosphoricum-d6-tabletten-A2262276-p10.webp',
            inventory: {
                current: 3,
                critical: 2,
            },
            ean: 1234234,
            brand: 'Marke',
            manufacturer: 'Hersteller',
        },
        {
            id: 6,
            name: 'Schüssler Salze Nummer 1',
            description: '',
            url: '',
            image: 'https://cdn.shop-apotheke.at/images/420x0/adler-schuessler-salze-nr-7-magnesium-phosphoricum-d6-tabletten-A2262276-p10.webp',
            inventory: {
                current: 4,
                critical: 2,
            },
            ean: 1234234,
            brand: 'Marke',
            manufacturer: 'Hersteller',
        },
        {
            id: 7,
            name: 'Schüssler Salze Nummer 1',
            description: '',
            url: '',
            image: 'https://cdn.shop-apotheke.at/images/420x0/adler-schuessler-salze-nr-7-magnesium-phosphoricum-d6-tabletten-A2262276-p10.webp',
            inventory: {
                current: 21,
                critical: 2,
            },
            ean: 1234234,
            brand: 'Marke',
            manufacturer: 'Hersteller',
        },
        {
            id: 8,
            name: 'Schüssler Salze Nummer 1',
            description: '',
            url: '',
            image: 'https://cdn.shop-apotheke.at/images/420x0/adler-schuessler-salze-nr-7-magnesium-phosphoricum-d6-tabletten-A2262276-p10.webp',
            inventory: {
                current: 1,
                critical: 2,
            },
            ean: 1234234,
            brand: 'Marke',
            manufacturer: 'Hersteller',
        },
    ];

    filteredProducts: Product[] = this.products;

    searchValue: string = '';

    onSearch() {
        this.filteredProducts = this.products.filter((prod) => {
            return prod.name
                .toLowerCase()
                .startsWith(this.searchValue.toLowerCase());
        });
    }
}
