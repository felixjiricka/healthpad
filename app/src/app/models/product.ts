import { BaseModel } from './base';

export class Product extends BaseModel {
    id!: number;
    name!: string;
    description!: string;
    category?: number;

    url!: string;
    image!: string;

    inventory!: {
        current: number;
        critical: number;
    };

    price?: number;
}
