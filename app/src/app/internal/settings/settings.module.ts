import { SettingsComponent } from './settings.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ImageUploadModule } from 'src/app/shared/image-upload/image-upload.module';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    NbButtonGroupModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
} from '@nebular/theme';
import { ProductSettingsComponent } from './product-settings/product-settings.component';

@NgModule({
    declarations: [SettingsComponent, ProfileSettingsComponent, ProductSettingsComponent],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        ImageUploadModule,
        NbIconModule,
        NbButtonGroupModule,
        NbButtonModule,
        NbCardModule,
        NbInputModule,
        NbCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SettingsModule {}
