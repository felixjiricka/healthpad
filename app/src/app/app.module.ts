import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
    NbButtonModule,
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule,
    NbDialogModule,
    NbDatepickerModule,
} from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeDeAt from '@angular/common/locales/de-at';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NbAuthModule } from '@nebular/auth';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { AuthGuard } from './guards/auth-guard.service';
import { State } from './models/state';
import { AvatarModule } from 'ngx-avatar';
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
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        NbAuthModule.forRoot({
            strategies: [
                NbFirebasePasswordStrategy.setup({
                    name: 'email',
                }),
            ],
            forms: {},
        }),
        AvatarModule,
        NbDialogModule.forRoot(),
        NbDatepickerModule.forRoot(),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de-AT' },
        NbFirebasePasswordStrategy,
        AuthGuard,
        State,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
