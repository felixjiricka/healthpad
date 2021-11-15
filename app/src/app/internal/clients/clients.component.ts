import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { State } from 'src/app/models/state';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
    constructor(private state: State) {}

    ngOnInit(): void {}

    searchValue!: string;

    filteredClients: Client[] = this.state.clients;

    onSearch() {
        this.filteredClients = this.state.clients.filter((client) => {
            return (
                client.name.first
                    .toLowerCase()
                    .startsWith(this.searchValue.toLowerCase()) ||
                client.name.sur
                    .toLowerCase()
                    .startsWith(this.searchValue.toLowerCase())
            );
        });
    }
}
