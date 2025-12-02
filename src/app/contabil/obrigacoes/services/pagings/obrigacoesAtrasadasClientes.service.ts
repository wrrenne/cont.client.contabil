import { Injectable, Injector } from '@angular/core';
import { ContabilClientePageItem } from 'src/app/contabil/models/clientes/pageItems';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';

@Injectable({
    providedIn: 'root',
})
export class ObrigacoesAtrasadasClientesPagingService extends ServicePagingBase<ContabilClientePageItem> {
    constructor(vars: Vars, injector: Injector, apisUtilsService: ApisUtilsService) {
        super(
            `${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/ObrigacoesClientesPeriodos/ObrigacoesAtrasadasClientesPagingGet/${vars.cadastro?.id}`,
            injector,
        );
    }
}
