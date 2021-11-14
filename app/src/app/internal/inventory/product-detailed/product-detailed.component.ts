import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { State } from 'src/app/models/state';

@Component({
    selector: 'app-product-detailed',
    templateUrl: './product-detailed.component.html',
    styleUrls: ['./product-detailed.component.scss'],
})
export class ProductDetailedComponent implements OnInit, OnDestroy {
    productId!: string;
    activeProduct!: Product;
    routeListener!: any;

    constructor(
        private route: ActivatedRoute,
        private state: State,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.routeListener = this.route.params.subscribe((params) => {
            this.productId = params['id'];

            let product = this.state.inventory.find(
                (el) => el.id == this.productId
            );

            if (typeof product !== 'undefined') {
                this.activeProduct = product;
            } else {
                console.error('ERROR');
            }
        });
    }

    ngOnDestroy(): void {
        this.routeListener.unsubscribe();
    }

    back() {
        this.location.back();
    }
}
