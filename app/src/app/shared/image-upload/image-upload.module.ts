import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';

@NgModule({
    declarations: [ImageUploadComponent],
    imports: [CommonModule],
    exports: [ImageUploadComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageUploadModule {}
