import { Routes } from '@angular/router';
import { UsersHomePage } from './pages/home/home';
import { UserPage } from './pages/user/user';
import { UsersComponent } from './users.component';

export const usersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: UsersHomePage,
            },
            {
                path: 'user/:id',
                component: UserPage,
            },
        ],
    },
];
