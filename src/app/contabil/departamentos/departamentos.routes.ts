import { Routes } from '@angular/router';
import { DepartamentosComponent } from './departamentos.component';
import { DepartamentoPage } from './pages/departamento/departamento';
import { DepartamentosHomePage } from './pages/home/home';

export const departamentosRoutes: Routes = [
    {
        path: '',
        component: DepartamentosComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: DepartamentosHomePage,
            },
            {
                path: 'departamento/:id',
                component: DepartamentoPage,
            },
        ],
    },
];
