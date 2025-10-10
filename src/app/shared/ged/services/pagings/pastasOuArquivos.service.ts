import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { PastaOuArquivoPageItem } from '../../models/pagings';
import { Vars } from '../../../variables';


@Injectable({
    providedIn: 'root'
})

export class PastasOuArquivosPagingService extends ServicePagingBase<PastaOuArquivoPageItem> {

    constructor(
        injector: Injector,
        vars: Vars,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiGed)}/arquivo/PastasOuArquivosPagingGet/${vars.cadastro?.id}`, injector)
    }
}
