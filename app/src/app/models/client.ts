import { BaseModel } from './base';

export class Client extends BaseModel {
    id!: string;
    name!: {
        first: string;
        sur: string;
    };
    birthdate!: any;
    contact!: {
        tel: string;
        mail: string;
    };
    address!: {
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
