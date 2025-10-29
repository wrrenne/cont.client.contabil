import { Injectable, Injector } from '@angular/core';
import { ClientePerfilObrigacaoPageItem } from 'src/app/contabil/models/obrigacoes/pagings';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';

@Injectable({
    providedIn: 'root',
})
export class ClienteObrigacoesAvulsasPagingService extends ServicePagingBase<ClientePerfilObrigacaoPageItem> {
    constructor(injector: Injector, apisUtilsService: ApisUtilsService, vars: Vars) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Perfis/ClienteObrigacoesAvulsasPagingGet/${vars.cadastro?.id!}`, injector);
    }
}
