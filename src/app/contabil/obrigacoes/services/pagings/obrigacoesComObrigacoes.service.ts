import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacaoPageItem } from '../../../models/obrigacoes/pagings';

@Injectable({
    providedIn: 'root',
})
export class ObrigacoesComObrigacoesPagingService extends ServicePagingBase<ObrigacaoPageItem> {
    constructor(vars: Vars, injector: Injector, apisUtilsService: ApisUtilsService) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Obrigacoes/ObrigacoesComObrigacoesPagingGet/${vars.cadastro?.id}`, injector);
    }
}
