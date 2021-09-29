import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    searchValue!: string;

    clients: Client[] = [
        {
            id: 1,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 2,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 3,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 4,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 5,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 5,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 6,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 7,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 8,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 9,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 10,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
        {
            id: 11,
            name: {
                first: 'Monika',
                sur: 'Stocker',
            },
            birthdate: '1965-04-29',
            adress: {
                street: 'Hauptstraße',
                number: 65,
                additional: '',
                postal: 7023,
                city: 'Zemendorf',
            },
            image: '',
            notes: '',
            medicalHistory: '',
        },
    ];

    filteredClients: Client[] = this.clients;

    onSearch() {
        this.filteredClients = this.clients.filter((client) => {
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
