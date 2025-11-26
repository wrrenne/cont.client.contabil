import { Injectable, Injector } from '@angular/core';
import { Vars } from 'src/app/shared/variables';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { PastaOuArquivoPageItem } from '../../models/pagings';

@Injectable({
    providedIn: 'root',
})
export class PastasOuArquivosPagingService extends ServicePagingBase<PastaOuArquivoPageItem> {
    constructor(injector: Injector, apisUtilsService: ApisUtilsService, vars: Vars) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiGed)}/arquivo/PastasOuArquivosPagingGet/${vars.cadastro?.id}`, injector);
    }
}
