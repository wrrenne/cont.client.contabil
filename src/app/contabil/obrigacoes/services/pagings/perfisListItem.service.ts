import { Injectable, Injector } from '@angular/core';
import { ListItem, ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';

@Injectable({
    providedIn: 'root'
})

export class PerfisListItemService extends ServicePagingBase<ListItem> {

    constructor(
        vars: Vars,
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/perfis/PerfisListItemGet/${vars.cadastro?.id}`, injector)
    }
}
