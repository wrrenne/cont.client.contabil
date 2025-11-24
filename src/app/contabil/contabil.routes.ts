import { Routes } from '@angular/router';
import { ContabilComponent } from './contabil.component';
import { ContabilHomePage } from './pages/home/home';

export const contabilRoutes: Routes = [
    {
        path: '',
        component: ContabilComponent,
        children: [
            {
                path: 'home',
                component: ContabilHomePage,
            },
            // {
            //     path: 'calendario',
            //     component: CalendarioAnualPage,
            // },
            // {
            //     path: 'tasks',
            //     loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule),
            // },
            {
                path: 'clientes',
                loadChildren: () => import('./clientes/clientes.routes').then((m) => m.clienteRoutes),
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.routes').then((m) => m.usersRoutes),
            },
            {
                path: 'obrigacoes',
                loadChildren: () => import('./obrigacoes/obrigacoes.routes').then((m) => m.obrigacoesRoutes),
            },
            {
                path: 'ged',
                loadChildren: () => import('./ged/ged.routes').then((m) => m.gedRoutes),
            },
            {
                path: 'departamentos',
                loadChildren: () => import('./departamentos/departamentos.routes').then((m) => m.departamentosRoutes),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
        ],
    },
];
