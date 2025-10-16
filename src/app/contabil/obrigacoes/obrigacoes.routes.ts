import { Routes } from '@angular/router';
import { ObrigacoesComponent } from './obrigacoes.component';
import { ObrigacoesHomePage } from './pages/home/home';
import { ObrigacaoPage } from './pages/obrigacao/obrigacao';
import { ObrigacoesPorClientePage } from './pages/obrigacoes-por-cliente/obrigacoes-por-cliente';
import { PerfilPage } from './pages/perfil/perfil';
import { PerfisPage } from './pages/perfis/perfis';

export const obrigacoesRoutes: Routes = [
    {
        path: '',
        component: ObrigacoesComponent,
        children: [
            {
                path: 'home',
                component: ObrigacoesHomePage,
            },
            //{
            //    path: 'calendario',
            //    component: CalendarioPage
            //},
            {
                path: 'obrigacao/:id',
                component: ObrigacaoPage,
            },
            {
                path: 'clientes',
                component: ObrigacoesPorClientePage,
            },
            {
                path: 'perfil/:id',
                component: PerfilPage,
            },
            {
                path: 'perfis',
                component: PerfisPage,
            },
        ],
    },
];
