import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
    NbButtonModule,
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule,
} from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NbThemeModule.forRoot(),
        NbEvaIconsModule,
        NbButtonModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({ name: 'healthpad' }),
        NbLayoutModule,
        NbSidebarModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
