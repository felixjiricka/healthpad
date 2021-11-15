import { Injectable } from '@angular/core';
import { Client } from './client';
import { Product } from './product';
import { User } from './user';

@Injectable()
export class State {
    user?: User;
    inventory: Product[] = [];
    clients: Client[] = [];
}
