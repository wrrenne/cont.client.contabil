import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ClientePage } from './pages/cliente/cliente';
import { ClientesHomePage } from './pages/home/home';

export const clienteRoutes: Routes = [
    {
        path: '',
        component: ClientesComponent,
        children: [
            {
                path: 'home',
                component: ClientesHomePage,
            },
            {
                path: 'cliente/:id',
                component: ClientePage,
            },
        ],
    },
];
