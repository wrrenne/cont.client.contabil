import { Routes } from '@angular/router';
import { ObrigacoesComponent } from './obrigacoes.component';
import { AuditoriaPage } from './pages/auditoria/auditoria';
import { ClienteObrigacoesPage } from './pages/cliente-obrigacoes/cliente-obrigacoes';
import { ObrigacoesHomePage } from './pages/home/home';
import { ObrigacaoObrigacoesPage } from './pages/obrigacao-obrigacoes/obrigacao-obrigacoes';
import { ObrigacaoPage } from './pages/obrigacao/obrigacao';
import { ObrigacoesPorClientePage } from './pages/obrigacoes-por-cliente/obrigacoes-por-cliente';
import { ObrigacoesPorObrigacaoPage } from './pages/obrigacoes-por-obrigacao/obrigacoes-por-obrigacao';
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
                path: 'clienteobrigacoes/:id',
                component: ClienteObrigacoesPage,
            },
            {
                path: 'obrigacaoobrigacoes/:id',
                component: ObrigacaoObrigacoesPage,
            },
            {
                path: 'obrigacao/:id',
                component: ObrigacaoPage,
            },
            {
                path: 'clientes',
                component: ObrigacoesPorClientePage,
            },
            {
                path: 'obrigacoes',
                component: ObrigacoesPorObrigacaoPage,
            },
            {
                path: 'perfil/:id',
                component: PerfilPage,
            },
            {
                path: 'perfis',
                component: PerfisPage,
            },
            {
                path: 'auditoria',
                component: AuditoriaPage,
            },
        ],
    },
];
