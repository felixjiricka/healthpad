import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    NbAuthResult,
    NbAuthService,
    NbRegisterComponent,
    NB_AUTH_OPTIONS,
} from '@nebular/auth';
import { User } from 'src/app/models/user';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends NbRegisterComponent {
    constructor(
        private firestore: FirestoreService,
        protected service: NbAuthService,
        @Inject(NB_AUTH_OPTIONS) protected options = {},
        protected cd: ChangeDetectorRef,
        protected router: Router
    ) {
        super(service, options, cd, router);
    }
    ngOnInit(): void {}

    register(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service
            .register(this.strategy, this.user)
            .subscribe((result: NbAuthResult) => {
                this.submitted = false;

                if (result.isSuccess()) {
                    this.messages = result.getMessages();

                    let uid = result.getResponse().user.uid;
                    console.log(uid);

                    let user: User = {
                        uid: uid,
                        firstName: this.user.firstName,
                        lastName: this.user.lastName,
                        company: '',
                        address: {
                            country: '',
                            region: '',
                            city: '',
                            postal: 0,
                            street: '',
                            number: 0,
                        },
                    };

                    this.firestore
                        .setUserData(user)
                        .then((data) => {
                            redirect();
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    this.errors = result.getErrors();
                }

                this.cd.detectChanges();

                const redirect = () => {
                    const redirect = result.getRedirect();
                    if (redirect) {
                        setTimeout(() => {
                            return this.router.navigateByUrl(redirect);
                        }, this.redirectDelay);
                    }
                };
            });
    }
}
