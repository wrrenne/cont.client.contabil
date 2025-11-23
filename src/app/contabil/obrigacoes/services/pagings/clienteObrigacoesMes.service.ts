import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacaoClientePeriodoPageItem } from '../../../models/obrigacoes/pagings/obrigacaoClientePeriodoPageItem';

@Injectable({
    providedIn: 'root',
})
export class ClienteObrigacoesMesPagingService extends ServicePagingBase<ObrigacaoClientePeriodoPageItem> {
    constructor(injector: Injector, apisUtilsService: ApisUtilsService, vars: Vars) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/ObrigacoesMes/ClienteObrigacoesMesPagingGet/${vars.cadastro?.id!}`, injector);
    }
}
