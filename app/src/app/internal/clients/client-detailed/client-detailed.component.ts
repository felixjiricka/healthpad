import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';
import { State } from 'src/app/models/state';

@Component({
    selector: 'app-client-detailed',
    templateUrl: './client-detailed.component.html',
    styleUrls: ['./client-detailed.component.scss'],
})
export class ClientDetailedComponent implements OnInit {
    clientId!: string;
    activeClient!: Client;
    routeListener!: any;

    constructor(
        private route: ActivatedRoute,
        private state: State,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.routeListener = this.route.params.subscribe((params) => {
            this.clientId = params['id'];

            let client = this.state.clients.find(
                (el) => el.id == this.clientId
            );

            if (typeof client !== 'undefined') {
                this.activeClient = client;
            } else {
                console.error('ERROR');
            }
        });
    }

    ngOnDestroy(): void {
        this.routeListener.unsubscribe();
    }

    back() {
        this.location.back();
    }
}
