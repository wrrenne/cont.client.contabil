import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { PastaPageItem } from '../../models/pagings';
import { Vars } from '../../../variables';

@Injectable({
    providedIn: 'root'
})

export class PastasByFuncionarioIdService extends ServicePagingBase<PastaPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService,
        vars: Vars
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiGed)}/arquivo/PastasByFuncionarioIdPagingGet/${vars.cadastro?.id}`, injector)
    }
}
