import { LOCALE_ID, NgModule } from '@angular/core';
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
import localeDeAt from '@angular/common/locales/de-at';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDeAt);

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
    providers: [{ provide: LOCALE_ID, useValue: 'de-AT' }],
    bootstrap: [AppComponent],
})
export class AppModule {}
