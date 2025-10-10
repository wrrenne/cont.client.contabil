import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../../../shared/services';
import { ObrigacaoPageItem } from '../../../models/obrigacoes/pagings';
import { Vars } from '../../../../shared/variables';


@Injectable({
    providedIn: 'root'
})

export class ObrigacoesPagingService extends ServicePagingBase<ObrigacaoPageItem> {

    constructor(
        vars: Vars,
        injector: Injector,
        apisUtilsService: ApisUtilsService,
        dateUtilsService: DateUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Obrigacoes/ObrigacoesPagingGet/${vars.cadastro?.id}/${dateUtilsService.firstDateOfCurrentMonthIso()}`, injector)
    }
}
