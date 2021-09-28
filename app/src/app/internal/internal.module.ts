import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalRoutingModule } from './internal-routing.module';
import { InternalComponent } from './internal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import {
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbSidebarModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [InternalComponent, DashboardComponent, InventoryComponent],
    imports: [
        CommonModule,
        InternalRoutingModule,
        NbIconModule,
        NbButtonModule,
        NbLayoutModule,
        NbSidebarModule,
        NbCardModule,
        NbInputModule,
        NbFormFieldModule,
        NbCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class InternalModule {}
