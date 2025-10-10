import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { PerfilPageItem } from '../../../models/clientes/pageItems';


@Injectable({
    providedIn: 'root'
})

export class PerfisPagingService extends ServicePagingBase<PerfilPageItem> {

    constructor(
        vars: Vars,
        injector: Injector,
        dateUtilsService: DateUtilsService,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Perfis/PerfisPagingGet/${vars.cadastro?.id}/${dateUtilsService.firstDateOfCurrentMonthIso()}`, injector)
    }
}
