import { Injectable, Injector } from '@angular/core';
import { ServicePagingBase } from '../../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../services';
import { PastaPageItem } from '../../models/pagings';


@Injectable({
    providedIn: 'root'
})

export class PastasPagingService extends ServicePagingBase<PastaPageItem> {

    constructor(
        injector: Injector,
        apisUtilsService: ApisUtilsService
    ) {
        super(`${apisUtilsService.getApiUrl(TMicroService.ApiGed)}/arquivo/PastasPagingGet`, injector)
    }
}
