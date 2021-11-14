import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'src/app/components/image-upload/image-cropper/image-cropper.component';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';

@NgModule({
    declarations: [ImageUploadComponent, ImageCropperComponent],
    imports: [
        CommonModule,
        ImageCropperModule,
        NbCardModule,
        NbButtonModule,
        NbIconModule,
    ],
    exports: [ImageUploadComponent, ImageCropperComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageUploadModule {}
