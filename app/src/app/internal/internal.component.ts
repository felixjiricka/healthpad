import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { State } from '../models/state';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-internal',
    templateUrl: './internal.component.html',
    styleUrls: ['./internal.component.scss'],
})
export class InternalComponent implements OnInit {
    constructor(private authService: AuthService, public state: State) {}

    ngOnInit(): void {}

    handleSignOut() {
        this.authService.SignOut();
    }
}
