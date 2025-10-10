import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { ArquivoPageItem } from '../../models/pagings';


@Injectable({
    providedIn: 'root'
})

export class ArquivosPagingService extends ServicePagingBase<ArquivoPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiGed)}/arquivo/ArquivosPagingGet`, injector)
    }
}
