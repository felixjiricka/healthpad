import { Component, OnInit } from '@angular/core';
import {
    NavigationEnd,
    NavigationStart,
    Router,
    RouterEvent,
} from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { State } from '../models/state';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-internal',
    templateUrl: './internal.component.html',
    styleUrls: ['./internal.component.scss'],
})
export class InternalComponent implements OnInit {
    constructor(
        private authService: AuthService,
        public state: State,
        private router: Router
    ) {}

    isLoader: boolean = true;

    ngOnInit(): void {}

    handleSignOut() {
        this.authService.SignOut();
        this.routerEvents();
    }

    routerEvents() {
        this.router.events.subscribe((event) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.isLoader = true;
                    break;
                }
                case event instanceof NavigationEnd: {
                    this.isLoader = false;
                    break;
                }
            }
        });
    }
}
