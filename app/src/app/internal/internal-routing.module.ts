import { ProductDetailedComponent } from './inventory/product-detailed/product-detailed.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InternalComponent } from './internal.component';
import { ClientsComponent } from './clients/clients.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProductFormComponent } from './inventory/product-form/product-form.component';
import { DataResolverService } from '../resolvers/data-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: InternalComponent,
        resolve: {
            posts: DataResolverService,
        },
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
                component: ProductFormComponent,
            },
            {
                path: 'inventory/:id',
                component: ProductDetailedComponent,
            },
            {
                path: 'inventory/:id/edit',
                component: ProductFormComponent,
            },
            {
                path: 'calendar',
                component: CalendarComponent,
            },
            {
                path: 'clients',
                component: ClientsComponent,
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import('./settings/settings.module').then(
                        (m) => m.SettingsModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InternalRoutingModule {}
