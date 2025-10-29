import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClientePerfilObrigacaoPageItem } from '../../../models/obrigacoes/pagings';

@Injectable({
    providedIn: 'root',
})
export class ClientePerfilObrigacoesPagingService extends ServicePagingBase<ClientePerfilObrigacaoPageItem> {
    constructor(vars: Vars, injector: Injector, apisUtilsService: ApisUtilsService) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Perfis/ClientePerfilObrigacoesPagingGet/${vars.cadastro?.id}`, injector);
    }
}
