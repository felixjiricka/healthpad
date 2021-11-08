import { InventoryComponent } from './inventory/inventory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InternalComponent } from './internal.component';
import { ClientsComponent } from './clients/clients.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddProductComponent } from './inventory/add-product/add-product.component';

const routes: Routes = [
    {
        path: '',
        component: InternalComponent,
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'inventory',
                component: InventoryComponent,
            },
            {
                path: 'inventory/new',
                component: AddProductComponent,
            },
            {
                path: 'calendar',
                component: CalendarComponent,
            },
            {
                path: 'clients',
                component: ClientsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InternalRoutingModule {}
