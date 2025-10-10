import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { Vars } from '../../../variables';
import { ArquivoPageItem } from '../../models/pagings';

@Injectable({
    providedIn: 'root'
})

export class ArquivosByFuncionarioIdService extends ServicePagingBase<ArquivoPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService,
        vars: Vars
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiGed)}/arquivo/ArquivosByFuncionarioIdPagingGet/${vars.cadastro?.id}`, injector)
    }
}
