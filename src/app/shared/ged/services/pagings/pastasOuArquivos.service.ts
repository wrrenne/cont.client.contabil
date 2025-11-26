import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { PastaOuArquivoPageItem } from '../../models/pagings';

@Injectable({
    providedIn: 'root',
})
export class PastasOuArquivosPagingService extends ServicePagingBase<PastaOuArquivoPageItem> {
    constructor(injector: Injector, apisUtilsService: ApisUtilsService) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiGed)}/arquivo/PastasOuArquivosPagingGet`, injector);
    }
}
