import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClienteUserPageItem } from '../../../models/users/pageItems';


@Injectable({
    providedIn: 'root'
})

export class ClienteUsersGetPagingService extends ServicePagingBase<ClienteUserPageItem> {

    constructor(
        injector: Injector,
        vars: Vars,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Users/ClienteUsersPagingGet/${vars.cadastro?.id}`, injector)
    }
}
