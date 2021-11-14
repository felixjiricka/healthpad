import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html',
    styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {
    @Input() event: any;
    croppedImage: any;

    constructor(public dialogRef: NbDialogRef<any>) {}

    ngOnInit(): void {}

    saveAndClose() {
        this.dialogRef.close(this.croppedImage);
    }

    dismiss() {
        this.dialogRef.close();
    }

    imageCropped(event: any) {
        this.croppedImage = this.base64ToFile(event.base64);
        console.log(event, this.croppedImage);
    }

    imageLoaded() {
        console.log('Image loaded');
    }

    cropperReady() {
        console.log('cropper ready');
    }

    loadImageFailed() {
        console.log('load failed');
    }

    // helper function
    base64ToFile(base64Image: string): Blob {
        const split = base64Image.split(',');
        const type = split[0].replace('data:', '').replace(';base64', '');
        const byteString = atob(split[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type });
    }
}
