import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../../shared/services';
import { ClientePerfilPageItem } from '../../../models/obrigacoes/pagings';

@Injectable({
    providedIn: 'root'
})

export class PerfilClientesPagingService extends ServicePagingBase<ClientePerfilPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/perfis/PerfilClientesPagingGet`, injector)
    }
}
