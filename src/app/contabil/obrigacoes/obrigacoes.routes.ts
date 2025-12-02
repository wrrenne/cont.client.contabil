import { Routes } from '@angular/router';
import { ObrigacoesComponent } from './obrigacoes.component';
import { AuditoriaPage } from './pages/auditoria/auditoria';
import { ClienteObrigacoesAtrasadasPage } from './pages/cliente-obrigacoes-atrasadas/cliente-obrigacoes-atrasadas';
import { ClienteObrigacoesPage } from './pages/cliente-obrigacoes/cliente-obrigacoes';
import { ObrigacoesHomePage } from './pages/home/home';
import { ObrigacaoObrigacoesPage } from './pages/obrigacao-obrigacoes/obrigacao-obrigacoes';
import { ObrigacaoPage } from './pages/obrigacao/obrigacao';
import { ObrigacoesAtrasadasClientesPage } from './pages/obrigacoes-atrasadas-clientes/obrigacoes-atrasadas-clientes';
import { ObrigacoesAtrasadasObrigacoesPage } from './pages/obrigacoes-atrasadas-obrigacoes/obrigacoes-atrasadas-obrigacoes';
import { ObrigacoesDepartamentoPorUserPage } from './pages/obrigacoes-departamento-por-user/obrigacoes-departamento-por-user';
import { ObrigacoesPorClientePage } from './pages/obrigacoes-por-cliente/obrigacoes-por-cliente';
import { ObrigacoesPorObrigacaoPage } from './pages/obrigacoes-por-obrigacao/obrigacoes-por-obrigacao';
import { ObrigacoesPorUserPage } from './pages/obrigacoes-por-user/obrigacoes-por-user';
import { PerfilPage } from './pages/perfil/perfil';
import { PerfisPage } from './pages/perfis/perfis';
import { UserObrigacoesPage } from './pages/user-obrigacoes/user-obrigacoes';

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
                path: 'userobrigacoes/:id',
                component: UserObrigacoesPage,
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
                path: 'clientesobrigacoesatrasadas/:id',
                component: ClienteObrigacoesAtrasadasPage,
            },
            {
                path: 'departamentousers/:id',
                component: ObrigacoesDepartamentoPorUserPage,
            },
            {
                path: 'users',
                component: ObrigacoesPorUserPage,
            },
            {
                path: 'obrigacoes',
                component: ObrigacoesPorObrigacaoPage,
            },
            {
                path: 'obrigacoesatrasadasclientes',
                component: ObrigacoesAtrasadasClientesPage,
            },
            {
                path: 'obrigacoesatrasadasobrigacoes',
                component: ObrigacoesAtrasadasObrigacoesPage,
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
