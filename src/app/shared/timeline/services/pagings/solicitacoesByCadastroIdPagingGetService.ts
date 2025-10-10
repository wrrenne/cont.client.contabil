import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ServicePagingBase } from '../../../models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { Vars } from '../../../variables';
import { SolicitacaoPageItem } from '../../models/pagings';


@Injectable({
    providedIn: 'root'
})

export class SolicitacoesByCadastroIdPagingGetService extends ServicePagingBase<SolicitacaoPageItem> {

    constructor(
        injector: Injector,
        vars: Vars,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiTimeline)}/Solicitacoes/SolicitacoesByCadastroIdPagingGet/${environment.sistema}/${vars.cadastro?.id}/${vars.user?.id}`, injector)
    }
}
