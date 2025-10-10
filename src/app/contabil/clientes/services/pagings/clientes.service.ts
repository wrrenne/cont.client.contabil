import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ContabilClientePageItem } from '../../../models/clientes/pageItems/contabilClientePageItem';


@Injectable({
    providedIn: 'root'
})

export class ClientesPagingService extends ServicePagingBase<ContabilClientePageItem> {

    constructor(
        vars: Vars,
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Clientes/ClientesPagingGet/${vars.cadastro?.id}`, injector)
    }
}
