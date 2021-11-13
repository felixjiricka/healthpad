import { Injectable } from '@angular/core';
import { Product } from './product';
import { User } from './user';

@Injectable()
export class State {
    user?: User;
    inventory: Product[] = [];
}
