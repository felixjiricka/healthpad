import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
    tempBase64: any = null;

    constructor() {}

    ngOnInit(): void {}

    updatePreview(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.tempBase64 = reader.result;
        };
    }

    getBase64() {
        return this.tempBase64;
    }
}
