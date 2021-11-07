import { ProductCategory } from './../../models/productCategory';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { State } from 'src/app/models/state';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
    filterForm!: FormGroup;
    constructor(private state: State) {}

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
            this.filteredProducts = this.state.inventory.filter((prod) => {
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

    filteredProducts: Product[] = this.state.inventory;

    searchValue: string = '';

    onSearch() {
        this.filteredProducts = this.state.inventory.filter((prod: Product) => {
            return prod.name
                .toLowerCase()
                .startsWith(this.searchValue.toLowerCase());
        });
    }
}
