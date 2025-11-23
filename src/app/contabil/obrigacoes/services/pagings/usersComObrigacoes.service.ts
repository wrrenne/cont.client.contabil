import { Injectable, Injector } from '@angular/core';
import { ContUserPageItem } from 'src/app/contabil/models/users/pageItems';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';

@Injectable({
    providedIn: 'root',
})
export class UsersComObrigacoesPagingService extends ServicePagingBase<ContUserPageItem> {
    constructor(vars: Vars, injector: Injector, apisUtilsService: ApisUtilsService) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Obrigacoes/UsersComObrigacoesPagingGet/${vars.cadastro?.id}`, injector);
    }
}
