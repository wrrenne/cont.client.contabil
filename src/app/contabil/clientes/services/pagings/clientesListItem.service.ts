import { Injectable, Injector } from '@angular/core';
import { ListItem, ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { environment } from '../../../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})

export class ClientesListItemService extends ServicePagingBase<ListItem> {

    constructor(
        vars: Vars,
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/ClientesListItemGet/${vars.cadastro?.id}/${environment.sistema}`, injector)
    }
}
