import { Component } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'Healthpad';

    constructor(private nbAuth: NbAuthService) {
        this.nbAuth.onAuthenticationChange().subscribe((data) => {
            console.log(data);
        });
    }
}
