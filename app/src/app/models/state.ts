import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class State {
    user!: User | null;
}
