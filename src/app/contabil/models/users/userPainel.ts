import { DashboardConfigModel } from 'src/app/shared/models';

export interface UserPainel {
    userId?: number;
    userNome: string;
    email: string;
    pwd: string;
    cadastroId: number;
    cadastroNome: string;
    ultimoAcesso?: string;
    dataInicial?: Date;
    dataFinal?: Date;
    dashboardConfig?: DashboardConfigModel;
}
