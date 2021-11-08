import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

import { InternalRoutingModule } from './internal-routing.module';
import { InternalComponent } from './internal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import {
    NbAutocompleteModule,
    NbButtonGroupModule,
    NbButtonModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbCardModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbSelectModule,
    NbSidebarModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsComponent } from './clients/clients.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddArticleComponent } from './inventory/add-article/add-article.component'; // a plugin!
import { NgxCurrencyModule } from 'ngx-currency';

FullCalendarModule.registerPlugins([
    // register FullCalendar plugins
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
]);

@NgModule({
    declarations: [
        InternalComponent,
        DashboardComponent,
        InventoryComponent,
        ClientsComponent,
        CalendarComponent,
        AddArticleComponent,
    ],
    imports: [
        CommonModule,
        InternalRoutingModule,
        NbIconModule,
        NbButtonGroupModule,
        NbButtonModule,
        NbLayoutModule,
        NbSidebarModule,
        NbCardModule,
        NbInputModule,
        NbFormFieldModule,
        NbCheckboxModule,
        NbCalendarModule,
        NbCalendarRangeModule,
        FormsModule,
        ReactiveFormsModule,
        FullCalendarModule,
        NbSelectModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
        NbAutocompleteModule
    ],
    providers: [],
})
export class InternalModule {}
