import { BaseModel } from './base';

export class Product extends BaseModel {
    id!: number;
    name!: string;
    brand!: string;
    manufacturer!: string;

    description!: string;
    category?: number;

    ean!: number;
    url!: string;
    image!: string;

    inventory!: {
        current: number;
        critical: number;
    };

    price?: number;
}
