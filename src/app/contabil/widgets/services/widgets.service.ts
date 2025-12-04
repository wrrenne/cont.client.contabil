import { Injectable, Injector } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { TSetor } from 'src/app/shared/enums';
import { ApiResponse, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../../shared/services';
import { WidgetDepartamento, WidgetObrigacoesAtrasadas, WidgetObrigacoesEntregues, WidgetProximosImpostos } from '../../models/widgets';
import { VarsApp } from '../../variables';

@Injectable({
    providedIn: 'root',
})
export class WidgetsService extends ServiceBase {
    constructor(
        private vars: VarsApp,
        private dateUtilsService: DateUtilsService,
        injector: Injector,
        private apisUtilsService: ApisUtilsService,
    ) {
        super(injector);
    }

    widgetObrigacoesEntreguesGet(): Observable<ApiResponse<WidgetObrigacoesEntregues>> {
        const cadastroId = this.vars.cadastro?.id;
        const mes = this.dateUtilsService.GetDateIsoString(this.vars.dataInicial!);
        const userId = this.vars.user?.id;

        return this.http
            .get<
                ApiResponse<WidgetObrigacoesEntregues>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Widgets/WidgetObrigacoesEntreguesGet/${cadastroId}/${mes}/${userId}`)
            .pipe(catchError(this.handleError));
    }

    widgetProximosImpostosGet(): Observable<ApiResponse<WidgetProximosImpostos>> {
        const cadastroId = this.vars.cadastro?.id;
        //const data = this.dateUtilsService.GetDateIsoString(this.dateUtilsService.getToday());
        const data = this.dateUtilsService.GetDateIsoString(new Date('2025-11-25'));
        const userId = this.vars.user?.id;

        return this.http
            .get<
                ApiResponse<WidgetProximosImpostos>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Widgets/WidgetProximosImpostosGet/${cadastroId}/${userId}?data=${data}`)
            .pipe(catchError(this.handleError));
    }

    widgetObrigacoesAtrasadasClientesGet(): Observable<ApiResponse<WidgetObrigacoesAtrasadas>> {
        const cadastroId = this.vars.cadastro?.id;
        const mes = this.dateUtilsService.GetDateIsoString(this.vars.dataInicial!);
        const userId = this.vars.user?.id;

        return this.http
            .get<
                ApiResponse<WidgetObrigacoesAtrasadas>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Widgets/WidgetObrigacoesAtrasadasClientesGet/${cadastroId}/${userId}?mes=${mes}&max=5`)
            .pipe(catchError(this.handleError));
    }

    widgetObrigacoesAtrasadasObrigacoesGet(): Observable<ApiResponse<WidgetObrigacoesAtrasadas>> {
        const cadastroId = this.vars.cadastro?.id;
        const mes = this.dateUtilsService.GetDateIsoString(this.vars.dataInicial!);
        const userId = this.vars.user?.id;

        return this.http
            .get<
                ApiResponse<WidgetObrigacoesAtrasadas>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Widgets/WidgetObrigacoesAtrasadasObrigacoesGet/${cadastroId}/${userId}?mes=${mes}&max=5`)
            .pipe(catchError(this.handleError));
    }

    widgetDepartamentoFiscalGet(): Observable<ApiResponse<WidgetDepartamento>> {
        const cadastroId = this.vars.cadastro?.id;
        const mes = this.dateUtilsService.GetDateIsoString(this.vars.dataInicial!);
        const userId = this.vars.user?.id;
        const setor = TSetor.Fiscal;

        return this.http
            .get<
                ApiResponse<WidgetDepartamento>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Widgets/WidgetDepartamentoGet/${cadastroId}/${mes}/${userId}/${setor}`)
            .pipe(catchError(this.handleError));
    }

    widgetDepartamentoContabilGet(): Observable<ApiResponse<WidgetDepartamento>> {
        const cadastroId = this.vars.cadastro?.id;
        const mes = this.dateUtilsService.GetDateIsoString(this.vars.dataInicial!);
        const userId = this.vars.user?.id;
        const setor = TSetor.Contabil;

        return this.http
            .get<
                ApiResponse<WidgetDepartamento>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Widgets/WidgetDepartamentoGet/${cadastroId}/${mes}/${userId}/${setor}`)
            .pipe(catchError(this.handleError));
    }

    widgetDepartamentoPessoalGet(): Observable<ApiResponse<WidgetDepartamento>> {
        const cadastroId = this.vars.cadastro?.id;
        const mes = this.dateUtilsService.GetDateIsoString(this.vars.dataInicial!);
        const userId = this.vars.user?.id;
        const setor = TSetor.Pessoal;

        return this.http
            .get<
                ApiResponse<WidgetDepartamento>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Widgets/WidgetDepartamentoGet/${cadastroId}/${mes}/${userId}/${setor}`)
            .pipe(catchError(this.handleError));
    }
}
