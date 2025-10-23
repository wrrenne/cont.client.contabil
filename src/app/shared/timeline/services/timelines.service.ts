import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../services';
import { Vars } from '../../variables';
import { TPostTipo, TSolicitacaoStatus } from '../enums';
import { SolicitacoesPorGrupoCount } from '../models';
import { CommentInput, SolicitacaoRespostaInput, SolicitacaoTratamentoInput } from '../models/inputs';
import { SolicitacaoRespostaOutput } from '../models/outputs';
import { ActivityPageItem, CommentPageItem, PostPageItem, SolicitacaoPageItem } from '../models/pagings';
import { SolicitacaoView } from '../models/views';

@Injectable({
    providedIn: 'root',
})
export class TimelinesService extends ServiceBase {
    constructor(
        injector: Injector,
        private apisUtilsService: ApisUtilsService,
        private vars: Vars,
    ) {
        super(injector);
    }

    commentCreate(input: CommentInput, postTipo?: TPostTipo): Observable<ApiResponse<number[]>> {
        let params = new HttpParams();
        if (postTipo) params = params.set('postTipo', postTipo);

        return this.http
            .post<ApiResponse<number[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline, true)}/Post/CommentCreate`, [input], {
                ...this.httpService.httpOptions,
                params,
            })
            .pipe(catchError(this.handleError));
    }

    solicitacaoTratamentoCreate(input: SolicitacaoTratamentoInput): Observable<ApiResponse<CommentPageItem[]>> {
        return this.http
            .post<
                ApiResponse<CommentPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Solicitacoes/SolicitacaoTratamentoCreate`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    solicitacaoRespostaCreate(input: SolicitacaoRespostaInput): Observable<ApiResponse<SolicitacaoRespostaOutput[]>> {
        return this.http
            .post<
                ApiResponse<SolicitacaoRespostaOutput[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Solicitacoes/SolicitacaoRespostaCreate`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    commentsByOrigemId(origemId: number, postTipo: TPostTipo): Observable<ApiResponse<CommentPageItem[]>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .post<
                ApiResponse<CommentPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Post/CommentsByOrigemId/${cadastroId}/${postTipo}`, [origemId], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    postByOrigemId(origemId: number, postTipo: TPostTipo): Observable<ApiResponse<PostPageItem>> {
        return this.http
            .post<
                ApiResponse<PostPageItem>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Post/PostByOrigemId/${postTipo}/${origemId}`, this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    commentsByPostIdGet(postId: number): Observable<ApiResponse<CommentPageItem[]>> {
        return this.http
            .get<ApiResponse<CommentPageItem[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Post/CommentsByPostId/${postId}`)
            .pipe(catchError(this.handleError));
    }

    commentGet(id: number): Observable<ApiResponse<CommentPageItem>> {
        return this.http
            .get<ApiResponse<CommentPageItem>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Post/CommentGet/${id}`)
            .pipe(catchError(this.handleError));
    }

    activitiesByCadastroIdListGet(): Observable<ApiResponse<ActivityPageItem[]>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<
                ApiResponse<ActivityPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Activities/ActivitiesByCadastroIdListGet/${environment.sistema}/${cadastroId}`)
            .pipe(catchError(this.handleError));
    }

    ActivityReadStatusHasUnredGet(): Observable<ApiResponse<boolean>> {
        const cadastroId = this.vars.cadastro?.id;
        const sistemaId = environment.sistema;
        const userId = this.vars.user?.id;

        return this.http
            .get<
                ApiResponse<boolean>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Activities/ActivityReadStatusHasUnredGet/${sistemaId}/${cadastroId}/${userId}`)
            .pipe(catchError(this.handleError));
    }

    ActivityReadStatusUpdate(): Observable<ApiResponse> {
        const cadastroId = this.vars.cadastro?.id;
        const sistemaId = environment.sistema;
        const userId = this.vars.user?.id;

        return this.http
            .post<ApiResponse>(
                `${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Activities/ActivityReadStatusUpdate/${sistemaId}/${cadastroId}/${true}`,
                [userId],
            )
            .pipe(catchError(this.handleError));
    }

    //activitiesByContabilidadeIdListGet(): Observable<ApiResponse<ActivityPageItem[]>> {
    //    const cadastroId = this.vars.cadastro?.id

    //    return this.http.get<ApiResponse<ActivityPageItem[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Activities/ActivitiesByCadastroIdListGet/${cadastroId}`)
    //        .pipe(catchError(this.handleError))
    //}

    activitiesByFuncionarioIdListGet(funcionarioId: number): Observable<ApiResponse<ActivityPageItem[]>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<
                ApiResponse<ActivityPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Activities/ActivitiesByFuncionarioIdListGet/${cadastroId}/${funcionarioId}`)
            .pipe(catchError(this.handleError));
    }

    solicitacoesByCadastroIdListGet(): Observable<ApiResponse<SolicitacaoPageItem[]>> {
        const cadastroId = this.vars.cadastro?.id;

        let params = new HttpParams();
        params = params.set('status', TSolicitacaoStatus.EmAberto);

        return this.http
            .get<
                ApiResponse<SolicitacaoPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Solicitacoes/SolicitacoesByCadastroIdListGet/${cadastroId}`, { params })
            .pipe(catchError(this.handleError));
    }

    solicitacoesByFuncionarioIdListGet(funcionarioId: number): Observable<ApiResponse<SolicitacaoPageItem[]>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<
                ApiResponse<SolicitacaoPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Solicitacoes/SolicitacoesByFuncionarioIdListGet/${cadastroId}/${funcionarioId}`)
            .pipe(catchError(this.handleError));
    }

    solicitacoesCountGet(): Observable<ApiResponse<SolicitacoesPorGrupoCount>> {
        const cadastroId = this.vars.cadastro?.id;
        const status = TSolicitacaoStatus.EmAberto;
        const userId = this.vars.user?.id;

        return this.http
            .get<
                ApiResponse<SolicitacoesPorGrupoCount>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Solicitacoes/SolicitacoesCountGet/${cadastroId}/${status}/${userId}`)
            .pipe(catchError(this.handleError));
    }

    solicitacaoViewGet(solicitacaoId: number): Observable<ApiResponse<SolicitacaoView>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<
                ApiResponse<SolicitacaoView>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Solicitacoes/SolicitacaoViewGet/${cadastroId}/${solicitacaoId}`)
            .pipe(catchError(this.handleError));
    }
}
