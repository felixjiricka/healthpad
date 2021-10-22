import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    NbAuthComponent,
    NbLoginComponent,
    NbRegisterComponent,
    NbLogoutComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./internal/internal.module').then((m) => m.InternalModule),
    },
    {
        path: 'auth',
        component: NbAuthComponent,
        children: [
            {
                path: '',
                component: NbLoginComponent,
            },
            {
                path: 'login',
                component: NbLoginComponent,
            },
            {
                path: 'register',
                component: NbRegisterComponent,
            },
            {
                path: 'logout',
                component: NbLogoutComponent,
            },
            {
                path: 'request-password',
                component: NbRequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: NbResetPasswordComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
