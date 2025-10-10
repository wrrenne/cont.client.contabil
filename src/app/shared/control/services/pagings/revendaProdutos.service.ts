import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { SistemaRevendaPageItem } from '../../models/pagings';
import { Vars } from '../../../variables';


@Injectable({
    providedIn: 'root'
})

export class RevendaProdutosPagingService extends ServicePagingBase<SistemaRevendaPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService,
        vars: Vars
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Control/RevendaProdutosPagingGet/${vars.cadastro?.id}`, injector)
    }
}
