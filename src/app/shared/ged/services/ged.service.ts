import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiResponse, Paging, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../services';
import { Vars } from '../../variables';
import { TFileType } from '../enums/ged-enums';
import { PastaPageItem } from '../models/pagings';
import { ArquivoView, PastaView } from '../models/views';

@Injectable({
    providedIn: 'root',
})
export class GedService extends ServiceBase {
    constructor(
        injector: Injector,
        private vars: Vars,
        private dateUtilsService: DateUtilsService,
        private apisUtilsService: ApisUtilsService,
    ) {
        super(injector);
    }

    arquivoPropertiesGet(id: number): Observable<ApiResponse<ArquivoView>> {
        return this.http
            .get<ApiResponse<ArquivoView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/ArquivoPropertiesGet/${id}`)
            .pipe(catchError(this.handleError));
    }

    pastaPropertiesGet(id: number, rootId?: number): Observable<ApiResponse<PastaView>> {
        let params = new HttpParams();

        if (rootId) params = params.set('rootId', rootId!);

        const userId = this.vars.user?.id;

        return this.http
            .get<ApiResponse<PastaView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/PastaPropertiesGet/${id}/${userId}`, { params })
            .pipe(catchError(this.handleError));
    }

    pastaCaminhoGet(id: number, rootId: number): Observable<ApiResponse<string>> {
        let params = new HttpParams();
        params = params.set('rootId', rootId);

        return this.http
            .get<ApiResponse<string>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/PastaCaminhoGet/${id}`, { params })
            .pipe(catchError(this.handleError));
    }

    pastaIdGet(codigo: string): Observable<ApiResponse<number | undefined>> {
        //const cadastroId = this.vars.cadastroOuContabilidadeIdGet()
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<ApiResponse<number | undefined>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/PastaIdGet/${cadastroId}/${codigo}`)
            .pipe(catchError(this.handleError));
    }

    pastaCadastroIdGet(cadastroId: number): Observable<ApiResponse<number | undefined>> {
        return this.http
            .get<ApiResponse<number | undefined>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/PastaCadastroIdGet/${cadastroId}`)
            .pipe(catchError(this.handleError));
    }

    arquivoDownload(id: number): Observable<Blob> {
        const userId = this.vars.user?.id;

        return this.http
            .get(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/ArquivoDownload/${id}/${userId}`, { responseType: 'blob' })
            .pipe(catchError(this.handleError));
    }

    arquivoTipoApontamentoUpload(
        funcionarioId: number,
        apontamentoId: number,
        apontamentoData: string,
        commentId: number,
        files: File[],
    ): Observable<ApiResponse<number | undefined>> {
        const formData = new FormData();

        formData.append('cadastroId', (<number>this.vars.cadastro?.id).toString());
        formData.append('funcionarioId', funcionarioId.toString());
        formData.append('apontamentoId', apontamentoId.toString());
        formData.append('commentId', commentId.toString());
        formData.append('userId', (<number>this.vars.user?.id).toString());
        formData.append('fileType', (<number>TFileType.Apontamento).toString());
        formData.append('competenciaMes', this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.vars.dataInicial!)));
        formData.append('apontamentoData', apontamentoData);

        for (const file of files) {
            formData.append('files', file, file.name);
        }

        return this.http
            .post<ApiResponse<number | undefined>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/ArquivoFormUpload`, formData)
            .pipe(catchError(this.handleError));
    }

    // arquivoTipoAtestadoUpload(
    //     funcionarioId: number,
    //     apontamentoId: number,
    //     apontamentoData: string,
    //     files: File[],
    // ): Observable<ApiResponse<number | undefined>> {
    //     const formData = new FormData();

    //     formData.append('cadastroId', (<number>this.vars.cadastro?.id).toString());
    //     formData.append('funcionarioId', funcionarioId.toString());
    //     formData.append('apontamentoId', apontamentoId.toString());
    //     formData.append('userId', (<number>this.vars.user?.id).toString());
    //     formData.append('fileType', (<number>TFileType.Atestado).toString());
    //     formData.append('competenciaMes', this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.vars.dataInicial!)));
    //     formData.append('apontamentoData', apontamentoData);

    //     for (const file of files) {
    //         formData.append('files', file, file.name);
    //     }

    //     return this.http
    //         .post<ApiResponse<number | undefined>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/ArquivoFormUpload`, formData)
    //         .pipe(catchError(this.handleError));
    // }

    arquivoTipoObrigacaoUpload(
        clienteId: number,
        obrigacaoClientePeriodoId: number,
        prazo: string,
        vencimento: string | undefined,
        competenciaMes: string | undefined,
        competenciaAno: number | undefined,
        commentId: number,
        files: File[],
    ): Observable<ApiResponse<number | undefined>> {
        const formData = new FormData();

        formData.append('cadastroId', (<number>this.vars.cadastro?.id).toString());

        formData.append('clienteId', clienteId.toString());
        formData.append('obrigacaoClientePeriodoId', obrigacaoClientePeriodoId.toString());

        if (vencimento) formData.append('obrigacaoVencimento', vencimento);

        if (competenciaMes) formData.append('competenciaMes', competenciaMes);

        if (competenciaAno) formData.append('competenciaAno', competenciaAno.toString());

        formData.append('obrigacaoPrazo', prazo);
        formData.append('commentId', commentId.toString());
        formData.append('userId', (<number>this.vars.user?.id).toString());
        formData.append('fileType', (<number>TFileType.Obrigacao).toString());

        for (const file of files) {
            formData.append('files', file, file.name);
        }

        return this.http
            .post<ApiResponse<number | undefined>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/ArquivoFormUpload`, formData)
            .pipe(catchError(this.handleError));
    }

    planoContasPagingGet(cadastroId: number, pastaId: number): Observable<ApiResponse<Paging<PastaPageItem>>> {
        const userId = <number>this.vars.user?.id;

        let params = new HttpParams();
        params = params.set('pastaId', pastaId.toString());

        return this.http
            .get<
                ApiResponse<number | undefined>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/PlanoContasPagingGet/${cadastroId}/${userId}`, { params })
            .pipe(catchError(this.handleError));
    }

    //getPDF(id: number): Promise<Blob> {
    //    const userId = this.vars.user?.id

    //    return this.http.get(`${environment.apiGedUrl}/Arquivo/ArquivoDownload/${id}/${userId}`, { responseType: 'blob' })
    //        .toPromise();
    //}

    //    PastaIdGetFromRefId(refId: number, refType: TGedRefType): Observable<ApiResponse<number>> {
    //        return this.http.get<ApiResponse<number>>(`${environment.apiGedUrl}/Arquivo/PastaIdGetFromRefId/${refId}/${<number>refType}`)
    //            .pipe(catchError(this.handleError))
    //    }
}
