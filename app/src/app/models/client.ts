import { BaseModel } from './base';

export class Client extends BaseModel {
    id!: number;
    name!: {
        first: string;
        sur: string;
    };
    birthdate!: string;
    adress!: {
        street: string;
        number: number;
        additional: string;
        postal: number;
        city: string;
    };

    image!: string; //base64
    notes!: string;
    medicalHistory!: string;
}
