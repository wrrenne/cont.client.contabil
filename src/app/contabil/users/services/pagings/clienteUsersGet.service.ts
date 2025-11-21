import { Injectable, Injector } from '@angular/core';
import { ContUserPageItem } from 'src/app/contabil/models/users/pageItems';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';

@Injectable({
    providedIn: 'root',
})
export class ClienteUsersGetPagingService extends ServicePagingBase<ContUserPageItem> {
    constructor(injector: Injector, vars: Vars, apisUtilsService: ApisUtilsService) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Users/ClienteUsersPagingGet/${vars.cadastro?.id}`, injector);
    }
}
