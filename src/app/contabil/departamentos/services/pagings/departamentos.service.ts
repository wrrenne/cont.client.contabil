import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { DepartamentoPageItem } from '../../../models/contabil/pageItems';


@Injectable({
    providedIn: 'root'
})

export class DepartamentosPagingService extends ServicePagingBase<DepartamentoPageItem> {

    constructor(
        vars: Vars,
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Departamentos/DepartamentosPagingGet/${vars.cadastro?.id}`, injector)
    }
}
