import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../../shared/services';
import { Vars } from '../../../shared/variables';
import { ClienteObrigacoesMesView } from '../../models/clientes/views';
import { TObrigacaoTipo } from '../../models/enums';
import { ObrigacaoInput } from '../../models/obrigacoes/inputs/obrigacaoInput';
import { ObrigacaoClientePeriodoPageItem, ObrigacaoPageItem } from '../../models/obrigacoes/pagings';
import { ObrigacaoClientePeriodoView, ObrigacaoView } from '../../models/obrigacoes/views';

@Injectable({
    providedIn: 'root',
})
export class ObrigacoesService extends ServiceBase {
    constructor(
        public injector: Injector,
        private dateUtilsService: DateUtilsService,
        private vars: Vars,
        private apisUtilsService: ApisUtilsService,
    ) {
        super(injector);
    }

    obrigacaoCreateOrUpdate(input: ObrigacaoInput): Observable<ApiResponse<number[]>> {
        return this.http
            .post<
                ApiResponse<number[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Obrigacoes/ObrigacaoCreateOrUpdate/`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    //obrigacaoGedConfiguracaoCreateOrUpdate(input: ObrigacaoInput): Observable<ApiResponse<ObrigacaoPageItem[]>> {
    //    return this.http.post<ApiResponse<ObrigacaoPageItem[]>>(`${environment.apiContabilObrigacoesUrl}/Obrigacoes/ObrigacaoCreateOrUpdate/`, [input], this.httpService.httpOptions)
    //        .pipe(catchError(this.handleError))
    //}

    obrigacaoGet(id: number): Observable<ApiResponse<ObrigacaoView>> {
        return this.http
            .get<ApiResponse<ObrigacaoView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Obrigacoes/ObrigacaoGet/${id}`)
            .pipe(catchError(this.handleError));
    }

    obrigacaoPageItemGet(id: number): Observable<ApiResponse<ObrigacaoPageItem>> {
        return this.http
            .get<
                ApiResponse<ObrigacaoPageItem>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Obrigacoes/ObrigacaoPageItemGet/${id}`)
            .pipe(catchError(this.handleError));
    }

    //obrigacaoGedConfiguracaoGet(id: number): Observable<ApiResponse<ObrigacaoGedConfiguracaoView>> {
    //    return this.http.get<ApiResponse<ObrigacaoGedConfiguracaoView>>(`${environment.apiContabilObrigacoesUrl}/Obrigacoes/ObrigacaoGedConfiguracaoGet/${id}`)
    //        .pipe(catchError(this.handleError))
    //}

    //clienteObrigacoesMesPagingGet(clienteId: number, mes: Date, tipo: TObrigacaoTipo): Observable<ApiResponse<Paging<ObrigacaoClientePeriodoView>>> {
    //    var m = this.dateUtilsService.GetDateIsoString(mes)
    //    var cadastroId = this.vars.cadastro?.id
    //    return this.http.get<ApiResponse<Paging<ObrigacaoClientePeriodoView>>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/ObrigacoesClientesPeriodos/ClienteObrigacoesMesPagingGet/${cadastroId}/${clienteId}/${m}/${tipo}`)
    //        .pipe(catchError(this.handleError))
    //}

    //obrigacaoObrigacoesMesPagingGet(obrigacaoId: number, mes: Date): Observable<ApiResponse<Paging<ObrigacaoClientePeriodoView>>> {
    //    var m = this.dateUtilsService.GetDateIsoString(mes)
    //    var cadastroId = this.vars.cadastro?.id
    //    return this.http.get<ApiResponse<Paging<ObrigacaoClientePeriodoView>>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/ObrigacoesClientesPeriodos/ObrigacaoObrigacoesMesPagingGet/${cadastroId}/${obrigacaoId}/${m}`)
    //        .pipe(catchError(this.handleError))
    //}

    //userObrigacoesMesPagingGet(obrigacaoId: number, mes: Date, tipo: TObrigacaoTipo): Observable<ApiResponse<Paging<ObrigacaoClientePeriodoView>>> {
    //    var m = this.dateUtilsService.GetDateIsoString(mes)
    //    var cadastroId = this.vars.cadastro?.id
    //    return this.http.get<ApiResponse<Paging<ObrigacaoClientePeriodoView>>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/ObrigacoesClientesPeriodos/UserObrigacoesMesPagingGet/${cadastroId}/${obrigacaoId}/${m}/${tipo}`)
    //        .pipe(catchError(this.handleError))
    //}

    //clienteObrigacoesMesGet(clienteId: number, mes: moment.Moment): Observable<ApiResponse<ClienteObrigacoesMesView>> {
    //    var m = this.dateUtilsService.GetDateIsoString(mes)
    //    var contabilidadeId = this.vars.contabilidade?.id
    //    return this.http.get<ApiResponse<ClienteObrigacoesMesView>>(`${environment.apiContabilObrigacoesUrl}/Obrigacoes/ClienteObrigacoesMesGet/${contabilidadeId}/${clienteId}/${m}`)
    //        .pipe(catchError(this.handleError))
    //}

    //obrigacaoObrigacoesMesGet(obrigacaoId: number, mes: moment.Moment): Observable<ApiResponse<ObrigacaoObrigacoesMesView>> {
    //    var m = this.dateUtilsService.GetDateIsoString(mes)
    //    var contabilidadeId = this.vars.contabilidade?.id
    //    return this.http.get<ApiResponse<ObrigacaoObrigacoesMesView>>(`${environment.apiContabilObrigacoesUrl}/Obrigacoes/ObrigacaoObrigacoesMesGet/${contabilidadeId}/${obrigacaoId}/${m}`)
    //        .pipe(catchError(this.handleError))
    //}

    obrigacaoClientePeriodoGet(obrigacaoClientePeriodoId: number): Observable<ApiResponse<ObrigacaoClientePeriodoView>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<
                ApiResponse<ObrigacaoClientePeriodoView>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/ObrigacoesClientesPeriodos/ObrigacaoClientePeriodoGet/${cadastroId}/${obrigacaoClientePeriodoId}`)
            .pipe(catchError(this.handleError));
    }

    obrigacaoClientePeriodoPageItemGet(obrigacaoClientePeriodoId: number): Observable<ApiResponse<ObrigacaoClientePeriodoPageItem>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<
                ApiResponse<ObrigacaoClientePeriodoPageItem>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/ObrigacoesClientesPeriodos/obrigacaoClientePeriodoPageItemGet/${cadastroId}/${obrigacaoClientePeriodoId}`)
            .pipe(catchError(this.handleError));
    }

    fillAvatares(obrigacoes: ObrigacaoClientePeriodoView[]) {
        //    obrigacoes
        //        .forEach(y => {
        //            y.avatares = []
        //            y.responsaveis.forEach(z => y.avatares
        //                .push({ userId: z.id, nome: z.userNome })
        //            )
        //        })
    }

    obrigacaoConclusao(obrigacaoClientePeriodoId: number, comentario: string, gedPastaCodigo: string, files: File[]): Observable<ApiResponse<number[]>> {
        const formData = new FormData();

        files.forEach((file, index) => {
            formData.append(`files`, file);
        });

        formData.append('comentario', comentario);
        formData.append('gedPastaCodigo', gedPastaCodigo);

        return this.http
            .post<
                ApiResponse<number[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes, true)}/ObrigacoesClientesPeriodos/ObrigacoesClientePeriodoConclusao/${this.vars.cadastro?.id}/${obrigacaoClientePeriodoId}/${this.vars.user?.id}`, formData)
            .pipe(catchError(this.handleError));
    }

    clienteObrigacoesStatsMesGet(clienteId: number, mes: Date, tipo?: TObrigacaoTipo): Observable<ApiResponse<ClienteObrigacoesMesView>> {
        var cadastroId = this.vars.cadastro?.id;

        var m = this.dateUtilsService.GetDateIsoString(mes);

        let params = new HttpParams();

        if (tipo) params = params.set('tipo', tipo);

        return this.http
            .get<
                ApiResponse<ClienteObrigacoesMesView>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/ObrigacoesClientesPeriodos/ClienteObrigacoesStatsMesGet/${cadastroId}/${clienteId}/${m}`, { params })
            .pipe(catchError(this.handleError));
    }
}
