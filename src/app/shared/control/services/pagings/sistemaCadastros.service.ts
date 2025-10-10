import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { SistemaCadastroPageItem, SistemaRevendaPageItem } from '../../models/pagings';


@Injectable({
    providedIn: 'root'
})

export class SistemaCadastrosPagingService extends ServicePagingBase<SistemaCadastroPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Control/SistemaCadastrosPagingGet`, injector)
    }
}
