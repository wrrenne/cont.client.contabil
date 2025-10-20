import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacaoUserPageItem } from '../../../models/users/pageItems';

@Injectable({
    providedIn: 'root',
})
export class ObrigacaoUsersGetPagingService extends ServicePagingBase<ObrigacaoUserPageItem> {
    constructor(injector: Injector, vars: Vars, apisUtilsService: ApisUtilsService) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Obrigacoes/ObrigacaoUsersPagingGet/${vars.cadastro?.id}`, injector);
    }
}
