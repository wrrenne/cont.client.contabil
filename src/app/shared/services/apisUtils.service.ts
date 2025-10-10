import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export class MicroService {
    ApiHost?: string;
    UrlPort!: number;
    Api!: string;
}

export enum TMicroService {
    ApiFuncionarios = 8082,
    ApiFuncionariosFerias = 8079,
    ApiCadastros = 8084,

    ApiControl = 8085,
    ApiControlUserPreferences = 8078,
    ApiControlPermissoes = 8083,
    ApiControlEmail = 8099,
    ApiPainel = 8091,
    ApiReports = 8076,
    ApiEmail = 8077,

    ApiTimeline = 8086,
    ApiGed = 8210,
    ApiTabelas = 8081,
    ApiAvatar = 8080,
    ApiTasks = 8087,

    ApiContabil = 8150,
    ApiContabilObrigacoes = 8151,
    ApiContabilSenhas = 8152,
    ApiContabilGed = 8153,

    ApiPonto = 8090,
    ApiPontoHorarios = 8092,
    ApiPontoApontamentos = 8093,
    ApiPontoMarcacoes = 8094,
    ApiPontoEspelhos = 8089,
    ApiPontoJustificativas = 8100,
    ApiPontoArquivoMarcacoes = 8101,
    ApiPontoRegras = 8095,
    ApiPontoPlanilha = 8096,
    ApiPontoReports = 8097,
    ApiPontoFolha = 8098,
    ApiPontoBanco = 8103,
    ApiPontoEmail = 8105,
    ApiPontoReps = 8106,
    ApiPontoIdFace = 8107,

    ApiHolerites = 8170,
    ApiHoleritesLeitura = 8171,
    ApiHoleritesReports = 8173,

    ApiFinanceiro = 8190,
    ApiFinanceiroContaCorrente = 8191,

    ApiRevenda = 8201,
}

//export const HostDefault = 'http://191.252.191.234'
//export const HostDefault = 'http://vps50318.publiccloud.com.br'
export const HostDefault = 'https://www.deskspace.com.br';
export const Localhost = 'http://localhost';

@Injectable({
    providedIn: 'root',
})
export class ApisUtilsService {
    microServices: MicroService[] = [
        //#region Demais
        {
            Api: 'cont.api.funcionarios',
            UrlPort: TMicroService.ApiFuncionarios,
        },
        {
            Api: 'cont.api.funcionarios.ferias',
            UrlPort: TMicroService.ApiFuncionariosFerias,
        },
        {
            Api: 'cont.api.control.permissoes',
            UrlPort: TMicroService.ApiControlPermissoes,
        },
        {
            Api: 'cont.api.painel',
            UrlPort: TMicroService.ApiPainel,
        },
        {
            Api: 'cont.api.reports',
            UrlPort: TMicroService.ApiReports,
        },
        {
            Api: 'cont.api.cadastros',
            UrlPort: TMicroService.ApiCadastros,
        },
        {
            Api: 'cont.api.control',
            UrlPort: TMicroService.ApiControl,
        },
        {
            Api: 'cont.api.control.userpreferences',
            UrlPort: TMicroService.ApiControlUserPreferences,
        },
        //{
        //    Api: 'cont.api.control.usermicronotificacoes',
        //    UrlPort: 8120
        //},
        {
            Api: 'cont.api.control.email',
            UrlPort: TMicroService.ApiControlEmail,
        },
        {
            Api: 'cont.api.timeline',
            UrlPort: TMicroService.ApiTimeline,
        },
        //{
        //    Api: 'cont.api.ged',
        //    UrlPort: 8180
        //},
        {
            Api: 'cont.api.ged',
            UrlPort: TMicroService.ApiGed,
        },
        {
            Api: 'cont.api.tabelas',
            UrlPort: TMicroService.ApiTabelas,
        },
        {
            Api: 'cont.api.avatar',
            UrlPort: TMicroService.ApiAvatar,
        },
        {
            Api: 'cont.api.tasks',
            UrlPort: TMicroService.ApiTasks,
        },
        //#endregion

        //#region Contabil
        {
            Api: 'cont.api.contabil',
            UrlPort: TMicroService.ApiContabil,
        },
        {
            Api: 'cont.api.contabil.obrigacoes',
            UrlPort: TMicroService.ApiContabilObrigacoes,
        },
        {
            Api: 'cont.api.contabil.senhas',
            UrlPort: TMicroService.ApiContabilSenhas,
        },
        {
            Api: 'cont.api.contabil.ged',
            UrlPort: TMicroService.ApiContabilGed,
        },
        //#endregion

        //#region Ponto
        {
            Api: 'cont.api.ponto',
            UrlPort: TMicroService.ApiPonto,
        },
        {
            Api: 'cont.api.ponto.horarios',
            UrlPort: TMicroService.ApiPontoHorarios,
        },
        {
            Api: 'cont.api.ponto.apontamentos',
            UrlPort: TMicroService.ApiPontoApontamentos,
        },
        {
            Api: 'cont.api.ponto.marcacoes',
            UrlPort: TMicroService.ApiPontoMarcacoes,
        },
        {
            Api: 'cont.api.ponto.espelhos',
            UrlPort: TMicroService.ApiPontoEspelhos,
        },
        {
            Api: 'cont.api.ponto.justificativas',
            UrlPort: TMicroService.ApiPontoJustificativas,
        },
        {
            Api: 'cont.api.ponto.arquivomarcacoes',
            UrlPort: TMicroService.ApiPontoArquivoMarcacoes,
        },
        {
            Api: 'cont.api.ponto.regras',
            UrlPort: TMicroService.ApiPontoRegras,
        },
        {
            Api: 'cont.api.ponto.reports',
            UrlPort: TMicroService.ApiPontoReports,
        },
        {
            Api: 'cont.api.ponto.folha',
            UrlPort: TMicroService.ApiPontoFolha,
        },
        {
            Api: 'cont.api.ponto.banco',
            UrlPort: TMicroService.ApiPontoBanco,
        },
        {
            Api: 'cont.api.ponto.reps',
            UrlPort: TMicroService.ApiPontoReps,
        },
        {
            Api: 'cont.api.ponto.planilha',
            UrlPort: TMicroService.ApiPontoPlanilha,
        },
        //#endregion

        //#region Holerites
        {
            Api: 'cont.api.holerites',
            UrlPort: TMicroService.ApiHolerites,
        },
        {
            Api: 'cont.api.holerites.leitura',
            UrlPort: TMicroService.ApiHoleritesLeitura,
        },
        {
            Api: 'cont.api.holerites.reports',
            UrlPort: TMicroService.ApiHoleritesReports,
        },
        //#endregion

        //#region Financeiro
        {
            Api: 'cont.api.financeiro',
            UrlPort: TMicroService.ApiFinanceiro,
        },
        {
            Api: 'cont.api.financeiro.contacorrente',
            UrlPort: TMicroService.ApiFinanceiroContaCorrente,
        },
        //#endregion

        //#region Revenda
        {
            Api: 'cont.api.revenda',
            UrlPort: TMicroService.ApiRevenda,
        },
    ];

    getApiUrl(microServiceId: TMicroService, localhost: boolean = false): string {
        var microService: MicroService = this.microServices.find((x) => x.UrlPort == microServiceId)!;

        if (localhost && !environment.production) {
            return `${Localhost}:${microService.UrlPort}`;
        } else {
            return `${microService.ApiHost ?? HostDefault}/${microService.Api}`;
        }
    }

    getApiUrlFromPort(microServiceId: TMicroService, localhost: boolean = false): string {
        var microService: MicroService = this.microServices.find((x) => x.UrlPort == microServiceId)!;

        var result = '';

        if (localhost && !environment.production) {
            result = `${Localhost}:${microService.UrlPort}`;
        } else {
            result = `${microService.ApiHost ?? HostDefault}:${microService.UrlPort}`;
        }

        if (!environment.production) result = result.replace('https', 'http');

        return result;
    }

    getFileServerUrl(): string {
        return `${HostDefault}/fileserver`;
    }
}
