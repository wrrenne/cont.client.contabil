import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { ObrigacaoClientePeriodoPageItem } from '../../../models/obrigacoes/pagings/obrigacaoClientePeriodoPageItem';
import { Vars } from '../../../../shared/variables';

@Injectable({
    providedIn: 'root'
})

export class ObrigacaoObrigacoesMesPagingService extends ServicePagingBase<ObrigacaoClientePeriodoPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService,
        vars: Vars
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/ObrigacoesClientesPeriodos/ObrigacaoObrigacoesMesPagingGet/${vars.cadastro?.id!}`, injector)
    }
}
