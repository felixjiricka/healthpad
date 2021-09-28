import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalRoutingModule } from './internal-routing.module';
import { InternalComponent } from './internal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  declarations: [
    InternalComponent,
    DashboardComponent,
    InventoryComponent
  ],
  imports: [
    CommonModule,
    InternalRoutingModule
  ]
})
export class InternalModule { }
