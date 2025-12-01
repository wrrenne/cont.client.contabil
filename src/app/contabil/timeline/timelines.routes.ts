import { Routes } from '@angular/router';
import { ActivitiesPage } from './pages/activities/activities';
import { TimelinesComponent } from './timelines.component';

export const timelineRoutes: Routes = [
    {
        path: '',
        component: TimelinesComponent,
        children: [
            // {
            //     path: 'posts',
            //     component: TimelineHomePage
            // },
            {
                path: 'activities',
                component: ActivitiesPage,
            },
            // {
            //     path: 'solicitacoes',
            //     component: SolicitacoesPage
            // },
            // {
            //     path: '',
            //     redirectTo: 'posts',
            //     pathMatch: 'full'
            // }
        ],
    },
];
