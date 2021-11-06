import { BaseModel } from './base';

export class User extends BaseModel {
    uid!: string;
    firstName!: string;
    lastName!: string;
    company!: string;
    address!: {
        country: string;
        region: string;
        city: string;
        postal: number;
        street: string;
        number: number;
    };
}
