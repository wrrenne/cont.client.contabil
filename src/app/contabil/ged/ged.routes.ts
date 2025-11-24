import { Routes } from '@angular/router';
import { GedComponent } from './ged.component';
import { GedHomePage } from './pages/home/home';

export const gedRoutes: Routes = [
    {
        path: '',
        component: GedComponent,
        children: [
            {
                path: '',
                component: GedHomePage
            },
            {
                path: ':id',
                component: GedHomePage
            }
        ]
    }
];
