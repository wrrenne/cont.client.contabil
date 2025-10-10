import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.routes').then((m) => m.loginRoutes)
    },
    {
        path: 'sistema',
        loadChildren: () => import('./contabil/contabil.routes').then((m) => m.contabilRoutes)
    },
    {
        path: '',
        redirectTo: 'sistema',
        pathMatch: 'full'
    }
];
