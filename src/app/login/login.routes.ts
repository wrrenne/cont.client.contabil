import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginAppPage } from './pages/login/login';
import { LoginDirectAppPage } from './pages/logindirect/logindirect';

export const loginRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: [
            {
                path: '',
                component: LoginAppPage
            },
            {
                path: 'direct',
                component: LoginDirectAppPage
            }
        ]
    }
];
