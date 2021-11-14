import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService } from '@nebular/theme';
import { first } from 'rxjs/operators';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
    previewImage: any;
    croppedImage: any;
    constructor(
        private dialogService: NbDialogService,
        private _sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {}

    updatePreview(ev: any) {
        const file = ev.target.files[0];

        this.dialogService
            .open(ImageCropperComponent, {
                context: {
                    event: ev,
                },
                hasBackdrop: false,
            })
            .onClose.pipe(first())
            .subscribe((res) => {
                if (res) {
                    this.croppedImage = res;
                    this.previewImage = this._sanitizer.bypassSecurityTrustUrl(
                        window.URL.createObjectURL(res)
                    );
                }
            });
    }

    getFile() {
        return this.croppedImage;
    }

    patchValue(value: any) {
        this.previewImage = value;
    }
}
