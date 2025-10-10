import { Injectable, Injector } from '@angular/core';
import { ListItem, ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';


@Injectable({
    providedIn: 'root'
})

export class DepartamentosListItemPagingService extends ServicePagingBase<ListItem> {

    constructor(
        vars: Vars,
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Departamentos/DepartamentosListItemGet/${vars.cadastro?.id}`, injector)
    }
}
