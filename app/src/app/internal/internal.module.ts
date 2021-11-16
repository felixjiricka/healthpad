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
    NbDatepickerModule,
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
import { NgxCurrencyModule } from 'ngx-currency';
import { ProductFormComponent } from './inventory/product-form/product-form.component';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
import { AvatarModule } from 'ngx-avatar';
import { ProductDetailedComponent } from './inventory/product-detailed/product-detailed.component';
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { de } from 'date-fns/locale';

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
        ProductFormComponent,
        ProductDetailedComponent,
        ClientFormComponent,
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
        NbAutocompleteModule,
        ImageUploadModule,
        AvatarModule,
        NbDatepickerModule,
        NbDateFnsDateModule.forRoot({
            parseOptions: { locale: de, format: 'dd.MM.yyy' },
            formatOptions: { locale: de, format: 'dd.MM.yyy' },
        }),
    ],
    providers: [],
})
export class InternalModule {}
