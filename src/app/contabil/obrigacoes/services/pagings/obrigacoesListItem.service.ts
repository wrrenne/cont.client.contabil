import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacaoListItem } from '../../../models/obrigacoes';

@Injectable({
    providedIn: 'root'
})

export class ObrigacoesListItemService extends ServicePagingBase<ObrigacaoListItem> {

    constructor(
        vars: Vars,
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Obrigacoes/ObrigacoesListItemGet/${vars.cadastro?.id}`, injector)
    }
}
